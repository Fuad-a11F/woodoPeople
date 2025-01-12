"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_PORT } = process.env;
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: Number(POSTGRES_PORT) || 5432,
    username: POSTGRES_USER,
    password: String(POSTGRES_PASSWORD),
    database: 'postgres',
    logging: console.log,
});
(async () => {
    try {
        await exports.sequelize.authenticate();
        console.log('✅ Успешно подключено к базе данных.');
    }
    catch (error) {
        console.error('❌ Ошибка подключения к базе данных:', error);
    }
    finally {
        await exports.sequelize.close();
    }
})();
