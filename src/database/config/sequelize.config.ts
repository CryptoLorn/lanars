import * as path from 'path';
import * as dotenv from 'dotenv';
import getter from '../../configs/configs';

dotenv.config({ path: '.env' });

const databaseConfig = getter().database;

export = {
  development: {
    dialect: 'postgres',
    host: databaseConfig.host,
    port: databaseConfig.port,
    username: databaseConfig.user,
    password: databaseConfig.password,
    database: databaseConfig.db_name,
    models: [
      path.join(process.cwd(), 'dist', 'src', 'database', 'models', '*.js'),
    ],
    migrationStorageTableName: 'sequelize_meta',
    migrations: [
      path.join(process.cwd(), 'dist', 'src', 'database', 'migrations', '*.js'),
    ],
    logging: false,
  },
};
