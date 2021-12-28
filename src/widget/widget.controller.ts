import { Controller, Post, Body } from '@nestjs/common';
import { WidgetService } from './widget.service';

@Controller('widget')
export class WidgetController {
    constructor(private readonly widgetService: WidgetService) {}

    // @Post('/sendMessage')
    // sendMessage(@Body() message: string, email: string): any {
    //     return this.widgetService.sendMessage(message, email)
    // }
}
