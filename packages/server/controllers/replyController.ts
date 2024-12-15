import { Request, Response } from 'express'
import { Reply } from '../models/Reply'
import { Comment } from '../models/Comment'

// Добавить ответ к комментарию
export const addReply = async (req: Request, res: Response) => {
  const { commentId, content, username } = req.body

  // Проверка обязательных полей
  if (!commentId || !content || !username) {
    res
      .status(400)
      .json({ error: 'Comment ID, Content и Username обязательны' })
    return
  }

  try {
    // Проверяем, существует ли комментарий
    const comment = await Comment.findByPk(commentId)

    if (!comment) {
      res.status(404).json({ error: 'Комментарий не найден' })
      return
    }

    // Создаем ответ
    const reply = await Reply.create({
      commentId: Number(commentId),
      content: String(content),
      username: String(username),
    } as any)

    res.status(200).json(reply)
  } catch (error) {
    console.error('Ошибка добавления ответа:', error)
    res.status(500).json({ error: 'Не удалось добавить ответ' })
  }
}
