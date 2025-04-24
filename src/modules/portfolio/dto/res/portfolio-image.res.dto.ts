import { PickType } from '@nestjs/swagger';

import { BaseImageResDto } from '../../../image/dto/res/base-image.res.dto';
import { BasePortfolioResDto } from './base-portfolio.res.dto';

export class PortfolioImageResDto extends PickType(BasePortfolioResDto, [
  'id',
  'name',
]) {
  images: Omit<BaseImageResDto, 'portfolio_id'>[];
}
