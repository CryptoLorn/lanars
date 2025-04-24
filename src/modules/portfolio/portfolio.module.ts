import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Portfolio } from '../../database/models/portfolio.model';
import { PortfolioController } from './portfolio.controller';
import { PortfolioRepository } from './portfolio.repository';
import { PortfolioService } from './portfolio.service';

@Module({
  imports: [SequelizeModule.forFeature([Portfolio])],
  controllers: [PortfolioController],
  providers: [PortfolioService, PortfolioRepository],
  exports: [PortfolioService],
})
export class PortfolioModule {}
