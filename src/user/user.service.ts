import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { User } from '@src/user/user.entity';
import { UserRepository } from '@src/user/user.repository';
import * as bcrypt from 'bcryptjs';
import { AuthService } from '@src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: UserRepository,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async signIn(createUserDto: CreateUserDto): Promise<any> {
    console.log(createUserDto);

    const { userName, password } = createUserDto;

    const saltRounds = 10;

    const found = await this.userRepository.findOne({ userName: userName });

    if (!found) {
      throw new NotFoundException('invalid credentials');
    }
    console.log(found);

    const isMatch = await bcrypt.compare(password, found.password);
    console.log(isMatch);

    if (!isMatch) {
      throw new NotFoundException('invalid credentials');
    }
    const token = await this.authService.login(createUserDto);
    console.log(token);

    return { userName, token };
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hash,
    });
    await this.userRepository.save(user);
    return user;
  }
}
