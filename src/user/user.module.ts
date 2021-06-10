import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '@src/auth/auth.module';
import { UserController } from '@src/user/user.controller';
import { UserService } from '@src/user/user.service';
import { userProviders } from './user.provider';
import { DatabaseModule } from '@src/database/database.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [...userProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
