import { Configs } from './config.type';

export default (): Configs => ({
  app: {
    port: parseInt(process.env.APP_PORT) || 5001,
    base_url: process.env.BASE_URL || 'http://localhost:5000',
  },
  database: {
    port: parseInt(process.env.DB_PORT) || 5432,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
  },
  jwt: {
    access_secret: process.env.ACCESS_TOKEN_SECRET,
    refresh_secret: process.env.REFRESH_TOKEN_SECRET,
    access_expires_in: parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN),
    refresh_expires_in: parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN),
  },
});
