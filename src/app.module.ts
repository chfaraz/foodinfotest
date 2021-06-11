import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { UserModule } from '@src/user/user.module';
import { ProductModule } from '@src/product/product.module';
import { AuthModule } from '@src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // DatabaseModule,
    TypeOrmModule.forRoot(),
    UserModule,
    ProductModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
