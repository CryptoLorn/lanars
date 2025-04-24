import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';

import { User } from '../../database/models/user.model';
import { SignUpReqDto } from '../auth/dto/req/sign-up.req.dto';
import { PrivateUserResDto } from './dto/res/private-user.res.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  public async create(
    dto: SignUpReqDto,
    transaction: Transaction,
  ): Promise<PrivateUserResDto> {
    return await this.userModel.create({ ...dto }, { transaction });
  }

  public async getById(id: string): Promise<PrivateUserResDto> {
    return await this.userModel.findByPk(id);
  }

  public async getByEmail(email: string): Promise<PrivateUserResDto> {
    return await this.userModel.findOne({ where: { email } });
  }

  public async deleteMe(id: string): Promise<void> {
    await this.userModel.destroy({ where: { id } });
  }
}
