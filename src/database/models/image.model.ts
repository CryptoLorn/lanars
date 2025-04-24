import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import { Comment } from './comment.model';
import { Portfolio } from './portfolio.model';

@Table({ tableName: 'images' })
export class Image extends Model<Image> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.TEXT)
  description: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  url: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @ForeignKey(() => Portfolio)
  @AllowNull(false)
  @Column(DataType.UUID)
  portfolio_id: string;

  @BelongsTo(() => Portfolio, {
    onDelete: 'CASCADE',
  })
  portfolio: Portfolio;

  @HasMany(() => Comment)
  comments: Comment[];
}
