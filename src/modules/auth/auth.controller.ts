import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { SignInReqDto } from './dto/req/sign-in.req.dto';
import { SignUpReqDto } from './dto/req/sign-up.req.dto';
import { AuthResDto } from './dto/res/auth.res.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { ITokenPair } from './interfaces/token-pair.interface';
import { IUserData } from './interfaces/user-date.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('sing-up')
  public async signUp(@Body() dto: SignUpReqDto): Promise<AuthResDto> {
    return await this.authService.signUp(dto);
  }

  @SkipAuth()
  @Post('sing-in')
  public async signIn(@Body() dto: SignInReqDto): Promise<AuthResDto> {
    return await this.authService.signIn(dto);
  }

  @SkipAuth()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  public async refresh(
    @CurrentUser() userData: IUserData,
  ): Promise<ITokenPair> {
    return await this.authService.refresh(userData);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('sign-out')
  public async signOut(@CurrentUser() userData: IUserData): Promise<void> {
    await this.authService.signOut(userData);
  }
}
