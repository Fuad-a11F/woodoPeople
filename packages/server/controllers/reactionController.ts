import { Request, Response } from 'express'
import { Reaction } from '../models/Reaction'

export const addReaction = async (req: Request, res: Response) => {
  const { comment_id, username, emoji } = req.body

  try {
    await Reaction.findOrCreate({
      where: { comment_id, username, emoji },
      defaults: { comment_id, username, emoji },
    })
    res.status(200).json(emoji)
  } catch (error) {
    console.error('Ошибка добавления реакции:', error)
    res.status(500).json({ error: 'Не удалось добавить реакцию' })
  }
}

export const deleteReaction = async (req: Request, res: Response) => {
  const { comment_id, username, emoji } = req.body

  try {
    await Reaction.destroy({
      where: { comment_id, username, emoji },
    })
    res.status(200).json(emoji)
  } catch (error) {
    console.error('Ошибка удаления реакции:', error)
    res.status(500).json({ error: 'Не удалось удалить реакцию' })
  }
}

export const getReactionsByPost = async (req: Request, res: Response) => {
  const { comment_id } = req.params

  try {
    const reactions = await Reaction.findAll({
      attributes: [
        'emoji',
        [Reaction.sequelize!.fn('COUNT', 'emoji'), 'count'],
      ],
      where: { comment_id },
      group: ['emoji'],
    })

    res.status(200).json(reactions)
  } catch (error) {
    res.status(500).json({ error: 'Не удалось получить реакции' })
  }
}
