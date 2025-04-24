import { PickType } from '@nestjs/swagger';

import { BaseImageReqDto } from './base-image.req.dto';

export class UploadImageReqDto extends PickType(BaseImageReqDto, [
  'name',
  'description',
]) {}
