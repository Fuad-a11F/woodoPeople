import { Reply } from './models/Reply'
import { Topic } from './models/Topic'
import { Comment } from './models/Comment'
import { Sequelize } from 'sequelize-typescript'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_PORT } = process.env

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: Number(POSTGRES_PORT) || 5432,
  username: POSTGRES_USER,
  password: String(POSTGRES_PASSWORD),
  database: 'postgres',
  models: [Topic, Comment, Reply],
  logging: false,
})

export const recreateTables = async () => {
  try {
    console.log('🟡 Удаление таблиц...')
    await sequelize.drop() // Удаление всех таблиц
    console.log('✅ Все таблицы удалены.')

    console.log('🟡 Пересоздание таблиц...')
    await sequelize.sync({ force: true }) // Пересоздание всех таблиц
    console.log('✅ Таблицы пересозданы.')
  } catch (error) {
    console.error('❌ Ошибка при пересоздании таблиц:', error)
    process.exit(1)
  }
}

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

// export const createClientAndConnect = async () => {
//   try {
//     console.log('🟡 Подключение к базе данных...');
//     await sequelize.authenticate();
//     console.log('✅ Подключение к базе данных успешно.');

//     // Удаление и пересоздание таблиц
//     await recreateTables();
//   } catch (error) {
//     console.error('❌ Ошибка подключения к базе данных:', error);
//     process.exit(1);
//   }
// };
