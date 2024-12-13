/* eslint-disable @typescript-eslint/no-var-requires */

import dotenv from 'dotenv'
import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import fs from 'fs'
import { ViteDevServer, createServer as createViteServer } from 'vite'
import { createClientAndConnect } from './db'
import forumRoutes from './routes/forumRoutes'

dotenv.config()

const isDev = () => process.env.NODE_ENV !== 'production'

const startServer = async () => {
  const app = express()
  app.use(cors())
  app.use(express.json())

  // Подключение маршрутов
  app.use('/api', forumRoutes)

  // Подключение к базе данных
  await createClientAndConnect()

  const port = Number(process.env.SERVER_PORT) || 3001
  let vite: ViteDevServer | undefined
  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcPath = path.dirname(require.resolve('client'))
  const ssrClientPath = require.resolve('client/ssr-dist/client.cjs')

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl

    try {
      let template: string

      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')

        template = await vite!.transformIndexHtml(url, template)
      }

      let render: (req: any) => Promise<{ html: string; initialState: unknown }>

      if (!isDev()) {
        render = (await import(ssrClientPath)).render
      } else {
        render = (
          await vite!.ssrLoadModule(
            path.resolve(srcPath, 'src/entry-server.tsx')
          )
        ).render
      }

      const { html: appHtml, initialState } = await render(req)

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(
          `<!--ssr-initial-state-->`,
          `<script>window.APP_INITIAL_STATE = ${JSON.stringify(
            initialState
          )}</script>`
        )
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
