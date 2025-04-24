import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Transaction } from 'sequelize';

import { Configs, JwtConfig } from '../../configs/config.type';
import { TokenType } from '../auth/enums/token-type.enum';
import {
  ITokenPair,
  ITokenPayload,
} from '../auth/interfaces/token-pair.interface';
import { TokenReqDto } from './dto/req/token.req.dto';
import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
  private jwtConfig: JwtConfig;
  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Configs>,
  ) {
    this.jwtConfig = configService.get<JwtConfig>('jwt');
  }

  public async generateAuthTokens(payload: ITokenPayload): Promise<ITokenPair> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.access_secret,
      expiresIn: this.jwtConfig.access_expires_in,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.refresh_secret,
      expiresIn: this.jwtConfig.refresh_expires_in,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  public async save(
    dto: TokenReqDto,
    transaction: Transaction,
  ): Promise<ITokenPair> {
    return await this.tokenRepository.save(dto, transaction);
  }

  public async deleteByUserId(
    userId: string,
    transaction?: Transaction,
  ): Promise<void> {
    await this.tokenRepository.deleteByUserId(userId, transaction);
  }

  public async verifyToken(
    token: string,
    type: TokenType,
  ): Promise<ITokenPayload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.getSecret(type),
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private getSecret(type: TokenType): string {
    let secret: string;
    switch (type) {
      case TokenType.ACCESS_TOKEN:
        secret = this.jwtConfig.access_secret;
        break;
      case TokenType.REFRESH_TOKEN:
        secret = this.jwtConfig.refresh_secret;
        break;
      default:
        throw new Error('Unknown token type');
    }
    return secret;
  }

  public async findOneBy(token: string, type: TokenType): Promise<ITokenPair> {
    return await this.tokenRepository.findOneBy(token, type);
  }
}
