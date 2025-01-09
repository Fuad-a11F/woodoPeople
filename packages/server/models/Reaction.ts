import { Table, Model, Column, DataType, CreatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Comment } from './Comment'

@Table({
  tableName: 'reactions',
  timestamps: false,
})
export class Reaction extends Model {
  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  comment_id!: number;

  @BelongsTo(() => Comment)
  comment!: Comment

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  emoji!: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  created_at!: Date;
}
