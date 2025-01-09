"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const topicController_1 = require("../controllers/topicController");
const commentController_1 = require("../controllers/commentController");
const replyController_1 = require("../controllers/replyController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Топики
router.get('/topics', authMiddleware_1.authMiddleware, topicController_1.getAllTopics);
router.post('/topics', authMiddleware_1.authMiddleware, topicController_1.createTopic);
router.get('/topics/:id', authMiddleware_1.authMiddleware, topicController_1.getTopicById);
// Комментарии
router.post('/comments', authMiddleware_1.authMiddleware, commentController_1.addComment);
// Ответы
router.post('/replies', authMiddleware_1.authMiddleware, replyController_1.addReply);
exports.default = router;
