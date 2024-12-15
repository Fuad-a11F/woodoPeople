import { Request, Response } from 'express'
import { Topic } from '../models/Topic'
import { Comment } from '../models/Comment'

// Получить все топики
export const getAllTopics = async (_: Request, res: Response) => {
  try {
    const topics = await Topic.findAll({
      include: [{ model: Comment }],
    })
    res.json(topics)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Не удалось получить список топиков' })
  }
}

// Создать новый топик
export const createTopic = async (req: Request, res: Response) => {
  const { title, content, username } = req.body

  // Проверка обязательных полей
  if (!title || !content || !username) {
    res.status(400).json({ error: 'Title, Content и Username обязательны' })
    return
  }

  try {
    // Создание топика
    const topic = await Topic.create({
      title,
      content,
      username,
    } as Topic)

    res.status(200).json(topic)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Не удалось создать топик' })
  }
}

// Получить конкретный топик с комментариями
export const getTopicById = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const topic = await Topic.findByPk(id, {
      include: [{ model: Comment, include: ['replies'] }],
    })

    if (!topic) {
      res.status(404).json({ error: 'Топик не найден' })
      return
    }

    res.json(topic)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Не удалось получить топик' })
  }
}
