import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { User } from '@src/user/user.entity';
import { UserService } from '@src/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signin')
  async findUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.signIn(createUserDto);
  }
  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.signUp(createUserDto);
  }
}
