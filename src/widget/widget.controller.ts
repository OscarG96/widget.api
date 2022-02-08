import { Controller, Post, Body, Get } from '@nestjs/common';
import { WidgetService } from './widget.service';

@Controller('widget')
export class WidgetController {
    constructor(private readonly widgetService: WidgetService) {}

    // @Post('/sendMessage')
    // sendMessage(@Body() message: string, email: string): any {
    //     return this.widgetService.sendMessage(message, email)
    // }

    @Get('/selectAgent')
    selectAgent() {
        return this.widgetService.selectAgent()
    }
}
