import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfig, Configs } from '../../configs/config.type';
import { BasePortfolioReqDto } from './dto/req/base-portfolio.req.dto';
import { BasePortfolioResDto } from './dto/res/base-portfolio.res.dto';
import { PortfolioImageResDto } from './dto/res/portfolio-image.res.dto';
import { PortfolioRepository } from './portfolio.repository';

@Injectable()
export class PortfolioService {
  private appConfig: AppConfig;
  constructor(
    private readonly portfolioRepository: PortfolioRepository,
    private readonly configService: ConfigService<Configs>,
  ) {
    this.appConfig = configService.get<AppConfig>('app');
  }

  public async create(
    dto: BasePortfolioReqDto,
    userId: string,
  ): Promise<BasePortfolioResDto> {
    return await this.portfolioRepository.create(dto, userId);
  }

  public async getAllWithImages(): Promise<PortfolioImageResDto[]> {
    const portfolioWithImages =
      await this.portfolioRepository.getAllWithImages();

    return portfolioWithImages.map((portfolio) => {
      return {
        id: portfolio.id,
        name: portfolio.name,
        images: portfolio.images.map((image) => {
          return {
            id: image.id,
            name: image.name,
            description: image.description,
            url: `${this.appConfig.base_url}${image.url}`,
          };
        }),
      };
    });
  }

  public async getById(id: string): Promise<BasePortfolioResDto> {
    return await this.portfolioRepository.getById(id);
  }

  public async deleteById(id: string): Promise<void> {
    await this.portfolioRepository.deleteById(id);
  }
}
