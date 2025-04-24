import { IsOptional, IsString } from 'class-validator';

export class BaseImageReqDto {
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public description: string;

  @IsString()
  public url: string;

  @IsString()
  portfolio_id: string;
}
