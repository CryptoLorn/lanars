import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';

import { Configs, DatabaseConfig } from '../../configs/config.type';
import { Comment } from '../../database/models/comment.model';
import { Image } from '../../database/models/image.model';
import { Portfolio } from '../../database/models/portfolio.model';
import { Token } from '../../database/models/token.model';
import { User } from '../../database/models/user.model';

@Injectable()
export class PostgresConnectService implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService<Configs>) {}
  createSequelizeOptions(): SequelizeModuleOptions {
    const databaseConfig = this.configService.get<DatabaseConfig>('database');
    return {
      dialect: 'postgres',
      host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.user,
      password: databaseConfig.password,
      database: databaseConfig.db_name,
      models: [User, Token, Portfolio, Image, Comment],
      autoLoadModels: true,
      synchronize: false,
      logging: false,
    };
  }
}
