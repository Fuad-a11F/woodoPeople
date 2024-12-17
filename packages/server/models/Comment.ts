import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript'
import { Topic } from './Topic'
import { Reply } from './Reply'

@Table({
  tableName: 'comments',
  timestamps: true,
})
export class Comment extends Model<Comment> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number

  @ForeignKey(() => Topic)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  topicId!: number

  @BelongsTo(() => Topic)
  topic!: Topic

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string

  @HasMany(() => Reply)
  replies!: Reply[]
}
