import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import { createClientAndConnect } from './db'
import forumRoutes from './routes/forumRoutes'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Подключение маршрутов
app.use('/api', forumRoutes)

// Подключение к базе данных и запуск сервера
const startServer = async () => {
  await createClientAndConnect()

  const port = process.env.SERVER_PORT || 3001
  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
