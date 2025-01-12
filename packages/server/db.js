"use strict";
// import { Reply } from './models/Reply'
// import { Topic } from './models/Topic'
// import { Comment } from './models/Comment'
// import { Sequelize } from 'sequelize-typescript'
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientAndConnect = exports.sequelize = void 0;
// const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_PORT } = process.env
// export const sequelize = new Sequelize({
//   dialect: 'postgres',
//   host: 'localhost',
//   port: Number(POSTGRES_PORT) || 5432,
//   username: POSTGRES_USER,
//   password: String(POSTGRES_PASSWORD),
//   database: 'postgres',
//   models: [Topic, Comment, Reply],
//   logging: false,
// })
// export const recreateTables = async () => {
//   try {
//     console.log('🟡 Удаление таблиц...')
//     await sequelize.drop() // Удаление всех таблиц
//     console.log('✅ Все таблицы удалены.')
//     console.log('🟡 Пересоздание таблиц...')
//     await sequelize.sync({ force: true }) // Пересоздание всех таблиц
//     console.log('✅ Таблицы пересозданы.')
//   } catch (error) {
//     console.error('❌ Ошибка при пересоздании таблиц:', error)
//     process.exit(1)
//   }
// }
// export const createClientAndConnect = async () => {
//   try {
//     console.log('🟡 Подключение к базе данных...')
//     await sequelize.authenticate()
//     console.log('✅ Подключение к базе данных успешно.')
//     // Синхронизация моделей с базой данных
//     await sequelize.sync({ alter: true })
//     console.log('✅ Таблицы синхронизированы с базой данных.')
//   } catch (error) {
//     console.error('❌ Ошибка подключения к базе данных:', error)
//     process.exit(1)
//   }
// }
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
const Reply_1 = require("./models/Reply");
const Topic_1 = require("./models/Topic");
const Comment_1 = require("./models/Comment");
const sequelize_typescript_1 = require("sequelize-typescript");
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_PORT } = process.env;
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: Number(POSTGRES_PORT) || 5432,
    username: POSTGRES_USER,
    password: String(POSTGRES_PASSWORD),
    database: 'postgres',
    models: [Topic_1.Topic, Comment_1.Comment, Reply_1.Reply],
    // logging: console.log,
    logging: false
});
// export const recreateTables = async () => {
//   if (process.env.NODE_ENV !== 'production') {
//     try {
//       console.log('🟡 Удаление таблиц (только для разработки)...');
//       await sequelize.drop(); // Удаление всех таблиц
//       console.log('✅ Все таблицы удалены.');
//       console.log('🟡 Пересоздание таблиц...');
//       await sequelize.sync({ force: true }); // Принудительное пересоздание таблиц
//       console.log('✅ Таблицы пересозданы.');
//     } catch (error) {
//       console.error('❌ Ошибка при пересоздании таблиц:', error);
//       process.exit(1);
//     }
//   } else {
//     console.log('Пропускаем пересоздание таблиц в production.');
//   }
// };
const createClientAndConnect = async () => {
    try {
        console.log('🟡 Подключение к базе данных...');
        await exports.sequelize.authenticate();
        console.log('✅ Подключение к базе данных успешно.');
        // console.log('🟡 Пересоздание таблиц...');
        // await recreateTables();
        // console.log('✅ Таблицы пересозданы.');
    }
    catch (error) {
        console.error('❌ Ошибка подключения к базе данных:', error);
        process.exit(1);
    }
};
exports.createClientAndConnect = createClientAndConnect;
