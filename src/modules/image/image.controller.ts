import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { PortfolioOwnerGuard } from '../../common/guards/portfolio-owner.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-date.interface';
import { UploadImageReqDto } from './dto/req/upload-image.req.dto';
import { BaseImageResDto } from './dto/res/base-image.res.dto';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UseGuards(PortfolioOwnerGuard)
  @Post('/:portfolioId')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @CurrentUser() userData: IUserData,
    @Param('portfolioId', ParseUUIDPipe) portfolioId: string,
    @Body() dto: UploadImageReqDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({
            fileType: 'image/jpeg|image/jpg|image/png|image/webp',
          }),
        ],
      }),
    )
    image: Express.Multer.File,
  ): Promise<BaseImageResDto> {
    return await this.imageService.uploadImage(
      dto,
      portfolioId,
      image,
      userData,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteById(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.imageService.deleteById(id, userData);
  }
}
