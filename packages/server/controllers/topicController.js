"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopicById = exports.createTopic = exports.getAllTopics = void 0;
const Topic_1 = require("../models/Topic");
const Comment_1 = require("../models/Comment");
// Получить все топики
const getAllTopics = async (_, res) => {
    try {
        const topics = await Topic_1.Topic.findAll({
            include: [{ model: Comment_1.Comment }],
        });
        res.json(topics);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Не удалось получить список топиков' });
    }
};
exports.getAllTopics = getAllTopics;
// Создать новый топик
const createTopic = async (req, res) => {
    const { title, content } = req.body;
    // Проверка обязательных полей
    if (!title || !content) {
        res.status(400).json({ error: 'Title, Content обязательны' });
        return;
    }
    try {
        // Создание топика
        const topic = await Topic_1.Topic.create({
            title,
            content,
        });
        res.status(200).json(topic);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Не удалось создать топик' });
    }
};
exports.createTopic = createTopic;
// Получить конкретный топик с комментариями
const getTopicById = async (req, res) => {
    const { id } = req.params;
    try {
        const topic = await Topic_1.Topic.findByPk(id, {
            include: [{ model: Comment_1.Comment, include: ['replies'] }],
        });
        if (!topic) {
            res.status(404).json({ error: 'Топик не найден' });
            return;
        }
        res.json(topic);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Не удалось получить топик' });
    }
};
exports.getTopicById = getTopicById;
