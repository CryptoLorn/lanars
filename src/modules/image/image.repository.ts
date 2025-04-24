import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Image } from '../../database/models/image.model';
import { BaseImageReqDto } from './dto/req/base-image.req.dto';
import { BaseImageResDto } from './dto/res/base-image.res.dto';

@Injectable()
export class ImageRepository {
  constructor(
    @InjectModel(Image)
    private readonly imageModel: typeof Image,
  ) {}

  public async create(dto: BaseImageReqDto): Promise<BaseImageResDto> {
    return await this.imageModel.create({ ...dto });
  }

  public async getById(id: string): Promise<BaseImageResDto> {
    return await this.imageModel.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  public async deleteById(id: string): Promise<void> {
    await this.imageModel.destroy({ where: { id } });
  }
}
