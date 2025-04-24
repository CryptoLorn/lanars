export type Configs = {
  app: AppConfig;
  database: DatabaseConfig;
  jwt: JwtConfig;
};

export type AppConfig = {
  port: number;
  base_url: string;
};

export type DatabaseConfig = {
  port: number;
  host: string;
  user: string;
  password: string;
  db_name: string;
};

export type JwtConfig = {
  access_secret: string;
  refresh_secret: string;
  access_expires_in: number;
  refresh_expires_in: number;
};
