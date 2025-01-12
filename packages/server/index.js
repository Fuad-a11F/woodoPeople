"use strict";
// /* eslint-disable @typescript-eslint/no-var-requires */
// import dotenv from 'dotenv'
// import cors from 'cors'
// import express, { Request, Response, NextFunction } from 'express'
// import path from 'path'
// import fs from 'fs'
// import type { ViteDevServer } from 'vite';
// import { createServer as createViteServer } from 'vite';
// import { createClientAndConnect } from './db'
// import forumRoutes from './routes/forumRoutes'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config()
// const isDev = () => process.env.NODE_ENV !== 'production'
// const startServer = async () => {
//   const app = express()
//   app.use(cors())
//   app.use(express.json())
//   // Подключение маршрутов
//   app.use('/api', forumRoutes)
//   // Подключение к базе данных
//   await createClientAndConnect()
//   const port = Number(process.env.SERVER_PORT) || 3001
//   let vite: ViteDevServer | undefined
//   const distPath = path.dirname(require.resolve('client/dist/index.html'))
//   const srcPath = path.dirname(require.resolve('client'))
//   const ssrClientPath = require.resolve('client/ssr-dist/client.cjs')
//   if (isDev()) {
//     vite = await createViteServer({
//       server: { middlewareMode: true },
//       root: srcPath,
//       appType: 'custom',
//     })
//     app.use(vite.middlewares)
//   }
//   app.get('/api', (_, res) => {
//     res.json('👋 Howdy from the server :)')
//   })
//   if (!isDev()) {
//     app.use('/assets', express.static(path.resolve(distPath, 'assets')))
//   }
//   app.use('*', async (req: Request, res: Response, next: NextFunction) => {
//     const url = req.originalUrl
//     try {
//       let template: string
//       if (!isDev()) {
//         template = fs.readFileSync(
//           path.resolve(distPath, 'index.html'),
//           'utf-8'
//         )
//       } else {
//         template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')
//         template = await vite!.transformIndexHtml(url, template)
//       }
//       let render: (req: any) => Promise<{ html: string; initialState: unknown }>
//       if (!isDev()) {
//         render = (await import(ssrClientPath)).render
//       } else {
//         render = (
//           await vite!.ssrLoadModule(
//             path.resolve(srcPath, 'src/entry-server.tsx')
//           )
//         ).render
//       }
//       const { html: appHtml, initialState } = await render(req)
//       const html = template
//         .replace(`<!--ssr-outlet-->`, appHtml)
//         .replace(
//           `<!--ssr-initial-state-->`,
//           `<script>window.APP_INITIAL_STATE = ${JSON.stringify(
//             initialState
//           )}</script>`
//         )
//       res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
//     } catch (e) {
//       if (isDev()) {
//         vite!.ssrFixStacktrace(e as Error)
//       }
//       next(e)
//     }
//   })
//   app.listen(port, () => {
//     console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
//   })
// }
// startServer()
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const db_1 = require("./db");
const forumRoutes_1 = __importDefault(require("./routes/forumRoutes"));
dotenv_1.default.config();
const isDev = () => process.env.NODE_ENV !== 'production';
const startServer = async () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    // Подключение маршрутов
    app.use('/api', forumRoutes_1.default);
    // Подключение к базе данных
    await (0, db_1.createClientAndConnect)();
    const port = Number(process.env.SERVER_PORT) || 3001;
    const distPath = path_1.default.dirname(require.resolve('client/dist/index.html'));
    const srcPath = path_1.default.dirname(require.resolve('client'));
    const ssrClientPath = require.resolve('client/ssr-dist/client.cjs');
    let vite; // Используем динамический импорт
    if (isDev()) {
        const { createServer } = await import('vite'); // Динамический импорт
        vite = await createServer({
            server: { middlewareMode: true },
            root: srcPath,
            appType: 'custom',
        });
        app.use(vite.middlewares);
    }
    app.get('/api', (_, res) => {
        res.json('👋 Howdy from the server :)');
    });
    if (!isDev()) {
        app.use('/assets', express_1.default.static(path_1.default.resolve(distPath, 'assets')));
    }
    app.use('*', async (req, res, next) => {
        const url = req.originalUrl;
        try {
            let template;
            if (!isDev()) {
                template = fs_1.default.readFileSync(path_1.default.resolve(distPath, 'index.html'), 'utf-8');
            }
            else {
                template = fs_1.default.readFileSync(path_1.default.resolve(srcPath, 'index.html'), 'utf-8');
                template = await vite.transformIndexHtml(url, template);
            }
            let render;
            if (!isDev()) {
                render = (await import(ssrClientPath)).render;
            }
            else {
                render = (await vite.ssrLoadModule(path_1.default.resolve(srcPath, 'src/entry-server.tsx'))).render;
            }
            const { html: appHtml, initialState } = await render(req);
            const html = template
                .replace(`<!--ssr-outlet-->`, appHtml)
                .replace(`<!--ssr-initial-state-->`, `<script>window.APP_INITIAL_STATE = ${JSON.stringify(initialState)}</script>`);
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        }
        catch (e) {
            if (isDev()) {
                vite.ssrFixStacktrace(e);
            }
            next(e);
        }
    });
    app.listen(port, () => {
        console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
};
startServer().catch(err => {
    console.error('Error starting server:', err);
});
