import { randomUUID } from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';

import { ForbiddenException, Injectable } from '@nestjs/common';

import { IUserData } from '../auth/interfaces/user-date.interface';
import { PortfolioService } from '../portfolio/portfolio.service';
import { UploadImageReqDto } from './dto/req/upload-image.req.dto';
import { BaseImageResDto } from './dto/res/base-image.res.dto';
import { ImageRepository } from './image.repository';

@Injectable()
export class ImageService {
  constructor(
    private readonly imageRepository: ImageRepository,
    private readonly portfolioService: PortfolioService,
  ) {}

  public async uploadImage(
    dto: UploadImageReqDto,
    portfolioId: string,
    image: Express.Multer.File,
    userData: IUserData,
  ): Promise<BaseImageResDto> {
    const uploadDir = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'static',
      `${userData.id}`,
    );
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const ext = path.extname(image.originalname);
    const uniqueName = `${randomUUID()}${ext}`;
    const savePath = path.join(uploadDir, uniqueName);

    fs.writeFileSync(savePath, image.buffer);

    return this.imageRepository.create({
      ...dto,
      url: `/static/${uniqueName}`,
      portfolio_id: portfolioId,
    });
  }

  public async deleteById(id: string, userData: IUserData): Promise<void> {
    const image = await this.imageRepository.getById(id);
    const portfolio = await this.portfolioService.getById(image.portfolio_id);
    if (!portfolio || portfolio.user_id !== userData.id) {
      throw new ForbiddenException('No access');
    }

    const fileName = path.basename(image.url);
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'static',
      `${userData.id}`,
      fileName,
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await this.imageRepository.deleteById(id);
  }
}
