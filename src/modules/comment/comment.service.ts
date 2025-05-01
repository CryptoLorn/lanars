import { Injectable } from '@nestjs/common';

import { CommentRepository } from './comment.repository';
import { CreateCommentReqDto } from './dto/req/create-comment.req.dto';
import { CommentResDto } from './dto/res/comment.res.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async addToImage(
    dto: CreateCommentReqDto,
    imageId: string,
    userId: string,
  ): Promise<CommentResDto> {
    return this.commentRepository.addToImage(dto, imageId, userId);
  }
}
