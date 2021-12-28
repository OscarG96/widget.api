import { Controller, Post, Body } from '@nestjs/common';
import { AgentService } from './agent.service';

@Controller('agent')
export class AgentController {
    constructor(private readonly agentService: AgentService) {}

    @Post('/create')
    createUser(@Body() agent: any): any {
        return this.agentService.createOne(agent)
    }
}
