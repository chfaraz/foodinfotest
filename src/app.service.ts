import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '===================================>> DEVELOPMENT server is up and running <<===================================';
  }
}
