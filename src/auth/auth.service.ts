import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { UserService } from '@src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userService.signIn(createUserDto);
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: CreateUserDto) {
    const payload = { userName: user.userName };
    return this.jwtService.sign(payload);
  }
}
