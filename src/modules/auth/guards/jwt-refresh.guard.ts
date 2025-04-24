import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { TokenService } from '../../token/token.service';
import { UserService } from '../../user/user.service';
import { TokenType } from '../enums/token-type.enum';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.get('Authorization')?.split('Bearer ')[1];
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const payload = await this.tokenService.verifyToken(
      refreshToken,
      TokenType.REFRESH_TOKEN,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }

    const isTokenExist = await this.tokenService.findOneBy(
      refreshToken,
      TokenType.REFRESH_TOKEN,
    );
    if (!isTokenExist) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.getById(payload.user_id);
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
