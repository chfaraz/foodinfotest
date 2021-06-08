import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
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
      throw new NotFoundException('user not found');
    }
    console.log(found);

    const isMatch = await bcrypt.compare(password, found.password);
    console.log(isMatch);

    if (!isMatch) {
      throw new NotFoundException('Wrong Password...');
    }
    const token = await this.authService.login(createUserDto);
    console.log(token);

    return { ...found, token };
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    let { userName, password } = createUserDto;
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);

    const user = this.userRepository.create({
      userName,
      password: hash,
    });
    await this.userRepository.save(user);
    return user;
  }
}
