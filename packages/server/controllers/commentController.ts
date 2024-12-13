import { Request, Response } from 'express'
import { Comment } from '../models/Comment'
import { Topic } from '../models/Topic'

// Добавить комментарий к топику
export const addComment = async (req: Request, res: Response) => {
  const { topicId, content, username } = req.body

  // Проверка обязательных полей
  if (!topicId || !content || !username) {
    res.status(400).json({ error: 'Topic ID, Content и Username обязательны' })
    return
  }

  try {
    // Проверяем, существует ли топик
    const topic = await Topic.findByPk(topicId)

    if (!topic) {
      res.status(404).json({ error: 'Топик не найден' })
      return
    }

    // Создаем комментарий
    const comment = await Comment.create({
      topicId: Number(topicId),
      content: String(content),
      username: String(username),
    } as any)

    res.status(200).json(comment)
  } catch (error) {
    console.error('Ошибка добавления комментария:', error)
    res.status(500).json({ error: 'Не удалось добавить комментарий' })
  }
}
