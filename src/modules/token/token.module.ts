import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import { Token } from '../../database/models/token.model';
import { TokenRepository } from './token.repository';
import { TokenService } from './token.service';

@Module({
  imports: [SequelizeModule.forFeature([Token])],
  providers: [TokenService, TokenRepository, JwtService],
  exports: [TokenService, TokenRepository],
})
export class TokenModule {}
