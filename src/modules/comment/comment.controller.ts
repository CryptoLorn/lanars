import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-date.interface';
import { CommentService } from './comment.service';
import { CreateCommentReqDto } from './dto/req/create-comment.req.dto';
import { CommentResDto } from './dto/res/comment.res.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/:imageId')
  async addToImage(
    @CurrentUser() userData: IUserData,
    @Param('imageId', ParseUUIDPipe) imageId: string,
    @Body() dto: CreateCommentReqDto,
  ): Promise<CommentResDto> {
    return this.commentService.addToImage(dto, imageId, userData.id);
  }
}
