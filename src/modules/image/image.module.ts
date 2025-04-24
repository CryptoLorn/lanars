import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Image } from '../../database/models/image.model';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { ImageController } from './image.controller';
import { ImageRepository } from './image.repository';
import { ImageService } from './image.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Image]),
    forwardRef(() => PortfolioModule),
  ],
  controllers: [ImageController],
  providers: [ImageService, ImageRepository],
})
export class ImageModule {}
