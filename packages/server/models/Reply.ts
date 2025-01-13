import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { Comment } from './Comment'

@Table({
  tableName: 'replies',
  timestamps: true,
})
export class Reply extends Model<Reply> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  commentId!: number

  @BelongsTo(() => Comment)
  comment!: Comment

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string
}
