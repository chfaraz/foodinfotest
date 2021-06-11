import * as PostgressConnectionStringParser from 'pg-connection-string';

const databaseUrl = process.env.DATABASE_URL;
const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);
module.exports = {
  type: 'postgres',
  name: connectionOptions.name,
  host: connectionOptions.host,
  port: connectionOptions.port,
  username: connectionOptions.username,
  password: connectionOptions.password,
  database: connectionOptions.database,
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migration/*.js'],
  cli: {
    migrationsDir: 'migration',
  },
  migrationsRun: true,
};
