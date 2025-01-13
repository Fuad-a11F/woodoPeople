import { Model } from 'sequelize-typescript'
import { Topic } from './Topic'
import { Reply } from './Reply'
export declare class Comment extends Model<Comment> {
  id: number
  topicId: number
  topic: Topic
  content: string
  replies: Reply[]
}
