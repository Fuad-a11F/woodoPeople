// import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript'
// import { Comment } from './Comment'

// @Table({
//   tableName: 'topics',
//   timestamps: true,
// })
// export class Topic extends Model<Topic> {
//   @Column({
//     type: DataType.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   })
//   declare id: number

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   title!: string

//   @Column({
//     type: DataType.TEXT,
//     allowNull: false,
//   })
//   content!: string

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   username!: string

//   @HasMany(() => Comment)
//   comments!: Comment[]
// }

import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript'
import { Comment } from './Comment'

@Table({
  tableName: 'topics',
  timestamps: true,
})
export class Topic extends Model<Topic> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string

  @HasMany(() => Comment)
  comments!: Comment[]
}
