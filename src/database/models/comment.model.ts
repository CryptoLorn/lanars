import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import { Image } from './image.model';
import { User } from './user.model';

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  text: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @ForeignKey(() => Image)
  @AllowNull(false)
  @Column(DataType.UUID)
  image_id: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  user_id: string;

  @BelongsTo(() => Image, {
    onDelete: 'CASCADE',
  })
  image: Image;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;
}
