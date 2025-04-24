import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { TokenService } from '../../token/token.service';
import { UserRepository } from '../../user/user.repository';
import { TokenType } from '../enums/token-type.enum';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.getAllAndOverride<boolean>('SKIP_AUTH', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) return true;

    const request = context.switchToHttp().getRequest();
    const accessToken = request.get('Authorization')?.split('Bearer ')[1];
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    const payload = await this.tokenService.verifyToken(
      accessToken,
      TokenType.ACCESS_TOKEN,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }

    const isTokenExist = await this.tokenService.findOneBy(
      accessToken,
      TokenType.ACCESS_TOKEN,
    );
    if (!isTokenExist) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.getById(payload.user_id);
    if (!user) {
      throw new UnauthorizedException();
    }
    request.user = {
      id: user.id,
      email: user.email,
    };
    return true;
  }
}
