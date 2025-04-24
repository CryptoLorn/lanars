import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Comment } from '../../database/models/comment.model';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  imports: [SequelizeModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
