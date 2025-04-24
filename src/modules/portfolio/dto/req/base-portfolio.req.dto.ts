import { IsString } from 'class-validator';

export class BasePortfolioReqDto {
  @IsString()
  public name: string;

  @IsString()
  public description: string;
}
