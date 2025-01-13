import { Model } from 'sequelize-typescript'
import { Comment } from './Comment'
export declare class Topic extends Model<Topic> {
  id: number
  title: string
  content: string
  comments: Comment[]
}
