import * as fs from 'node:fs';
import * as path from 'node:path';

import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';

import { SignUpReqDto } from '../auth/dto/req/sign-up.req.dto';
import { IUserData } from '../auth/interfaces/user-date.interface';
import { PrivateUserResDto } from './dto/res/private-user.res.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async create(
    dto: SignUpReqDto,
    transaction: Transaction,
  ): Promise<PrivateUserResDto> {
    return await this.userRepository.create(dto, transaction);
  }

  public async getById(id: string): Promise<PrivateUserResDto> {
    return await this.userRepository.getById(id);
  }

  public async getByEmail(email: string): Promise<PrivateUserResDto> {
    return await this.userRepository.getByEmail(email);
  }

  public async deleteMe(userData: IUserData): Promise<void> {
    const folderPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'static',
      `${userData.id}`,
    );

    if (fs.existsSync(folderPath)) {
      await fs.promises.rm(folderPath, { recursive: true, force: true });
    }

    await this.userRepository.deleteMe(userData.id);
  }
}
