"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const TEST_TOKEN = 'test-token';
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // Проверка наличия заголовка авторизации
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(403).json({ error: 'Пользователь не авторизован' });
        return;
    }
    const token = authHeader.split(' ')[1];
    // Пример проверки токена
    if (!validateToken(token)) {
        res.status(403).json({ error: 'Пользователь не авторизован' });
        return;
    }
    // Продолжение обработки запроса
    next();
};
exports.authMiddleware = authMiddleware;
const validateToken = (token) => {
    // Пример: простой тестовый токен
    return token === TEST_TOKEN;
};
