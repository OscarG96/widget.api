import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/createuser')
    createUser(@Body() user: any): any {
        return this.userService.createOne(user)
    }
}
