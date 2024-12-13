import express from 'express'
import {
  getAllTopics,
  createTopic,
  getTopicById,
} from '../controllers/topicController'
import { addComment } from '../controllers/commentController'
import { addReply } from '../controllers/replyController'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = express.Router()

// Топики
router.get('/topics', authMiddleware, getAllTopics)
router.post('/topics', authMiddleware, createTopic)
router.get('/topics/:id', authMiddleware, getTopicById)

// Комментарии
router.post('/comments', authMiddleware, addComment)

// Ответы
router.post('/replies', authMiddleware, addReply)

export default router
