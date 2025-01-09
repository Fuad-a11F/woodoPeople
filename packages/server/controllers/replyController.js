"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReply = void 0;
const Reply_1 = require("../models/Reply");
const Comment_1 = require("../models/Comment");
// Добавить ответ к комментарию
const addReply = async (req, res) => {
    const { commentId, content, username } = req.body;
    // Проверка обязательных полей
    if (!commentId || !content || !username) {
        res
            .status(400)
            .json({ error: 'Comment ID, Content и Username обязательны' });
        return;
    }
    try {
        // Проверяем, существует ли комментарий
        const comment = await Comment_1.Comment.findByPk(commentId);
        if (!comment) {
            res.status(404).json({ error: 'Комментарий не найден' });
            return;
        }
        // Создаем ответ
        const reply = await Reply_1.Reply.create({
            commentId: Number(commentId),
            content: String(content),
            username: String(username),
        });
        res.status(200).json(reply);
    }
    catch (error) {
        console.error('Ошибка добавления ответа:', error);
        res.status(500).json({ error: 'Не удалось добавить ответ' });
    }
};
exports.addReply = addReply;
