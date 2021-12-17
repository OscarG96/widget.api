import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/createuser')
  createUser(@Body() data: any): any {
    console.log(data)
    return true
    // return this.appService.createUser()
  }
}
