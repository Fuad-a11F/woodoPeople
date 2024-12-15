import { Table, Model, Column, DataType, CreatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'reactions',
  timestamps: false,
})
export class Reaction extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  comment_id!: number;

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
