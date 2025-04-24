import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { PostgresConnectService } from './postgres.connect.service';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: PostgresConnectService,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class PostgresModule {}
