"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = void 0;
const Comment_1 = require("../models/Comment");
const Topic_1 = require("../models/Topic");
// Добавить комментарий к топику
const addComment = async (req, res) => {
    const { topicId, content } = req.body;
    // Проверка обязательных полей
    if (!topicId || !content) {
        res.status(400).json({ error: 'Topic ID, Content обязательны' });
        return;
    }
    try {
        // Проверяем, существует ли топик
        const topic = await Topic_1.Topic.findByPk(topicId);
        if (!topic) {
            res.status(404).json({ error: 'Топик не найден' });
            return;
        }
        // Создаем комментарий
        const comment = await Comment_1.Comment.create({
            topicId: Number(topicId),
            content: String(content),
            // username: String(username),
        });
        res.status(200).json(comment);
    }
    catch (error) {
        console.error('Ошибка добавления комментария:', error);
        res.status(500).json({ error: 'Не удалось добавить комментарий' });
    }
};
exports.addComment = addComment;
