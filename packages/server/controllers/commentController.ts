import { Request, Response } from 'express'
import { Comment } from '../models/Comment'
import { Topic } from '../models/Topic'
import { Attributes } from 'sequelize'

// Добавить комментарий к топику
export const addComment = async (req: Request, res: Response) => {
  const { topicId, content } = req.body

  // Логируем тип и значение content
  console.log('Тип content:', typeof content)
  console.log('Значение content:', content)

  if (!topicId || !content) {
    res.status(400).json({ error: 'Topic ID и Content обязательны.' })
    return
  }

  if (typeof content !== 'string') {
    res.status(400).json({ error: 'Content должен быть строкой.' })
    return
  }

  try {
    const topic = await Topic.findByPk(topicId)

    if (!topic) {
      res.status(404).json({ error: 'Топик не найден.' })
      return
    }

    const comment = Comment.build({
      topicId: Number(topicId),
      content,
    } as Attributes<Comment>)

    await comment.save()

    res.status(201).json(comment)
  } catch (error) {
    console.error('Ошибка добавления комментария:', error)
    res.status(500).json({ error: 'Не удалось добавить комментарий.' })
  }
}
