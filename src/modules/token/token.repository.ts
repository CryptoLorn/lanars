import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';

import { Token } from '../../database/models/token.model';
import { TokenType } from '../auth/enums/token-type.enum';
import { ITokenPair } from '../auth/interfaces/token-pair.interface';
import { TokenReqDto } from './dto/req/token.req.dto';

@Injectable()
export class TokenRepository {
  constructor(
    @InjectModel(Token)
    private readonly tokenModel: typeof Token,
  ) {}

  public async save(
    dto: TokenReqDto,
    transaction: Transaction,
  ): Promise<ITokenPair> {
    return await this.tokenModel.create({ ...dto }, { transaction });
  }

  public async findOneBy(token: string, type: TokenType): Promise<ITokenPair> {
    return await this.tokenModel.findOne({
      where: { [type]: token },
    });
  }

  public async deleteByUserId(
    userId: string,
    transaction?: Transaction,
  ): Promise<void> {
    await this.tokenModel.destroy({ where: { user_id: userId }, transaction });
  }
}
