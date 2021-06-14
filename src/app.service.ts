import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '===================================>> PRODUCTION server is up and running <<===================================';
  }
}
