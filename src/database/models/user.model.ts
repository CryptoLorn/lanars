import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Default,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

import { Comment } from './comment.model';
import { Portfolio } from './portfolio.model';
import { Token } from './token.model';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasOne(() => Token)
  tokens: Token;

  @HasMany(() => Portfolio)
  portfolios: Portfolio[];

  @HasMany(() => Comment)
  comments: Comment[];
}
