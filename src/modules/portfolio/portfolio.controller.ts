import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { PortfolioOwnerGuard } from '../../common/guards/portfolio-owner.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/user-date.interface';
import { BasePortfolioReqDto } from './dto/req/base-portfolio.req.dto';
import { BasePortfolioResDto } from './dto/res/base-portfolio.res.dto';
import { PortfolioImageResDto } from './dto/res/portfolio-image.res.dto';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: BasePortfolioReqDto,
  ): Promise<BasePortfolioResDto> {
    return await this.portfolioService.create(dto, userData.id);
  }

  @SkipAuth()
  @Get()
  async getAllWithImages(): Promise<PortfolioImageResDto[]> {
    return await this.portfolioService.getAllWithImages();
  }

  @UseGuards(PortfolioOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteById(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.portfolioService.deleteById(id);
  }
}
