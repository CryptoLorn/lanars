import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize-typescript';

import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
import { SignInReqDto } from './dto/req/sign-in.req.dto';
import { SignUpReqDto } from './dto/req/sign-up.req.dto';
import { AuthResDto } from './dto/res/auth.res.dto';
import { ITokenPair } from './interfaces/token-pair.interface';
import { IUserData } from './interfaces/user-date.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly sequelize: Sequelize,
  ) {}

  public async signUp(dto: SignUpReqDto): Promise<AuthResDto> {
    return await this.sequelize.transaction(async (transaction) => {
      const isUserExist = await this.userService.getByEmail(dto.email);
      if (isUserExist) {
        throw new ConflictException('User already exist');
      }
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.userService.create(
        {
          ...dto,
          password: hashedPassword,
        },
        transaction,
      );

      const tokenPair = await this.tokenService.generateAuthTokens({
        user_id: user.id,
        email: user.email,
      });

      await this.tokenService.save(
        {
          user_id: user.id,
          ...tokenPair,
        },
        transaction,
      );

      return {
        user: {
          id: user.id,
          email: user.email,
        },
        tokens: tokenPair,
      };
    });
  }

  public async signIn(dto: SignInReqDto): Promise<AuthResDto> {
    return await this.sequelize.transaction(async (transaction) => {
      const user = await this.userService.getByEmail(dto.email);
      if (!user) {
        throw new UnauthorizedException('Wrong email or password');
      }
      const isPasswordValid = await bcrypt.compare(dto.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Wrong email or password');
      }
      const tokenPair = await this.tokenService.generateAuthTokens({
        user_id: user.id,
        email: dto.email,
      });

      await Promise.all([
        this.tokenService.deleteByUserId(user.id, transaction),
        this.tokenService.save(
          {
            user_id: user.id,
            ...tokenPair,
          },
          transaction,
        ),
      ]);

      return {
        user: {
          id: user.id,
          email: user.email,
        },
        tokens: tokenPair,
      };
    });
  }

  public async refresh(userData: IUserData): Promise<ITokenPair> {
    return await this.sequelize.transaction(async (transaction) => {
      await this.tokenService.deleteByUserId(userData.id, transaction);

      const tokenPair = await this.tokenService.generateAuthTokens({
        user_id: userData.id,
        email: userData.email,
      });

      await this.tokenService.save(
        {
          user_id: userData.id,
          ...tokenPair,
        },
        transaction,
      );

      return tokenPair;
    });
  }

  public async signOut(userData: IUserData): Promise<void> {
    await this.tokenService.deleteByUserId(userData.id);
  }
}
