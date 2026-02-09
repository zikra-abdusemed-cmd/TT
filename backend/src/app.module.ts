import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { CategoryModule } from './category/category.module';
import { ResultModule } from './result/result.module';

// Temporary debug log to verify environment variables are loaded correctly.
// This runs at module load time and does not affect the Nest module metadata.
// eslint-disable-next-line no-console
console.log('DB config seen by Nest:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  name: process.env.DB_NAME,
  ssl: process.env.DB_SSL,
});

@Module({
  imports: [
    // Load `.env` automatically so all Supabase / DB credentials are available.
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',

      /**
       * Supabase Postgres connection
       *
       * Configure these environment variables with the values from the
       * "Connection string" section of your Supabase project:
       *
       *   DB_HOST     - e.g. aws-0-eu-west-1.pooler.supabase.com
       *   DB_PORT     - usually 6543 or 5432
       *   DB_USER     - the database user
       *   DB_PASSWORD - the database password
       *   DB_NAME     - the database name (usually "postgres")
       *   DB_SSL      - set to "true" when connecting to Supabase
       *
       * For local development without Supabase you can leave these unset
       * and the defaults below will be used.
       */
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'Lifeoftheworld@3',
      database: process.env.DB_NAME || 'abysiniaQuiz',

      /**
       * Supabase requires SSL for direct database connections.
       * When DB_SSL is "true" we enable SSL with relaxed certificate
       * verification which works with Supabase's managed certificates.
       */
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,

      entities: [__dirname + '/**/*.entity{.ts,.js}'],

      // IMPORTANT: Supabase already has your schema (created via SQL),
      // so we must NOT let TypeORM try to change it automatically.
      // Turning synchronize off avoids errors like
      // "cannot drop column id of table users because other objects depend on it".
      synchronize: false,
    }),
    AuthModule,
    UserModule,
    QuestionModule,
    CategoryModule,
    ResultModule,
  ],
})
export class AppModule {}
