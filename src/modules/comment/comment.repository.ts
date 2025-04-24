import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Comment } from '../../database/models/comment.model';
import { CreateCommentReqDto } from './dto/req/create-comment.req.dto';
import { CommentResDto } from './dto/res/comment.res.dto';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectModel(Comment)
    private readonly commentModel: typeof Comment,
  ) {}

  public async addToImage(
    dto: CreateCommentReqDto,
    imageId: string,
    userId: string,
  ): Promise<CommentResDto> {
    return await this.commentModel.create({
      text: dto.text,
      image_id: imageId,
      user_id: userId,
    });
  }
}
