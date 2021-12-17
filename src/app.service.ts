import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World, from NestJs!';
  }

  createUser(user, email): any {
    console.log(user, email)
  }
}
