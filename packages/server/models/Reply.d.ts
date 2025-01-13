import { Model } from 'sequelize-typescript'
import { Comment } from './Comment'
export declare class Reply extends Model<Reply> {
  id: number
  commentId: number
  comment: Comment
  content: string
}
