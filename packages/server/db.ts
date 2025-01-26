import { Reply } from './models/Reply'
import { Topic } from './models/Topic'
import { Comment } from './models/Comment'
import { Sequelize } from 'sequelize-typescript'
import { Reaction } from './models/Reaction'

// const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_PORT } = process.env

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  models: [Topic, Comment, Reply, Reaction],
  logging: false,
})

export const createClientAndConnect = async () => {
  try {
    console.log('🟡 Подключение к базе данных...')
    await sequelize.authenticate()
    console.log('✅ Подключение к базе данных успешно.')

    // Синхронизация моделей с базой данных
    await sequelize.sync({ alter: true })
    console.log('✅ Таблицы синхронизированы с базой данных.')
  } catch (error) {
    console.error('❌ Ошибка подключения к базе данных:', error)
    process.exit(1)
  }
}
