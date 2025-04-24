import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Image } from '../../database/models/image.model';
import { Portfolio } from '../../database/models/portfolio.model';
import { BasePortfolioReqDto } from './dto/req/base-portfolio.req.dto';
import { BasePortfolioResDto } from './dto/res/base-portfolio.res.dto';
import { PortfolioImageResDto } from './dto/res/portfolio-image.res.dto';

@Injectable()
export class PortfolioRepository {
  constructor(
    @InjectModel(Portfolio)
    private readonly portfolioModel: typeof Portfolio,
  ) {}

  public async create(
    dto: BasePortfolioReqDto,
    userId: string,
  ): Promise<BasePortfolioResDto> {
    return await this.portfolioModel.create({ ...dto, user_id: userId });
  }

  public async getAllWithImages(): Promise<PortfolioImageResDto[]> {
    return await this.portfolioModel.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          model: Image,
          attributes: { exclude: ['portfolio_id', 'createdAt', 'updatedAt'] },
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  public async getById(id: string): Promise<BasePortfolioResDto> {
    return await this.portfolioModel.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  public async deleteById(id: string): Promise<void> {
    await this.portfolioModel.destroy({ where: { id } });
  }
}
