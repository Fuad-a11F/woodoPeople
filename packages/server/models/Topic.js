"use strict";
// import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript'
// import { Comment } from './Comment'
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topic = void 0;
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
const sequelize_typescript_1 = require("sequelize-typescript");
const Comment_1 = require("./Comment");
let Topic = class Topic extends sequelize_typescript_1.Model {
    title;
    content;
    comments;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Topic.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Topic.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Topic.prototype, "content", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Comment_1.Comment),
    __metadata("design:type", Array)
], Topic.prototype, "comments", void 0);
Topic = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'topics',
        timestamps: true,
    })
], Topic);
exports.Topic = Topic;
