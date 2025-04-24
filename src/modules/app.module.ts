import * as path from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';

import { GlobalExceptionFilter } from '../common/http/global-exception.filter';
import configuration from '../configs/configs';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { ImageModule } from './image/image.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { PostgresModule } from './postgres/postgres.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', '..', 'static'),
      serveRoot: '/static',
    }),
    PostgresModule,
    AuthModule,
    UserModule,
    PortfolioModule,
    ImageModule,
    CommentModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
