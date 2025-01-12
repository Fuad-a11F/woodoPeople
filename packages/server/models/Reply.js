"use strict";
// import {
//   Table,
//   Model,
//   Column,
//   DataType,
//   ForeignKey,
//   BelongsTo,
// } from 'sequelize-typescript'
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
exports.Reply = void 0;
// @Table({
//   tableName: 'replies',
//   timestamps: true,
// })
// export class Reply extends Model<Reply> {
//   @Column({
//     type: DataType.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   })
//   declare id: number
//   @ForeignKey(() => Comment)
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false,
//   })
//   commentId!: number
//   @BelongsTo(() => Comment)
//   comment!: Comment
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
// }
const sequelize_typescript_1 = require("sequelize-typescript");
const Comment_1 = require("./Comment");
let Reply = class Reply extends sequelize_typescript_1.Model {
    commentId;
    comment;
    content;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Reply.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Comment_1.Comment),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Reply.prototype, "commentId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Comment_1.Comment),
    __metadata("design:type", Comment_1.Comment)
], Reply.prototype, "comment", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Reply.prototype, "content", void 0);
Reply = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'replies',
        timestamps: true,
    })
], Reply);
exports.Reply = Reply;
