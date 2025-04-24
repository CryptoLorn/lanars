import {
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

import { User } from './user.model';

@Table({
  tableName: 'tokens',
})
export class Token extends Model<Token> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  access_token: string;

  @Column({ type: DataType.STRING, allowNull: false })
  refresh_token: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user_id: string;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;
}
