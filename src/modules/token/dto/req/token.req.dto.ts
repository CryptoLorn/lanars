import { IsString } from 'class-validator';

export class TokenReqDto {
  @IsString()
  public user_id: string;

  @IsString()
  public access_token: string;

  @IsString()
  public refresh_token: string;
}
