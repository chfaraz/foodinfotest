import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER_NAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: false,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: ['migration/*.js'],
        cli: {
          migrationsDir: 'migration',
        },
        migrationsRun: true,
      }),
  },
];
