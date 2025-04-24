import { IsString } from 'class-validator';

export class CreateCommentReqDto {
  @IsString()
  public text: string;
}
