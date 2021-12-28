import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';
import { MessageDto } from "./message/message.dto";
import { WidgetService } from "./widget/widget.service";

// const io = new Server({ /* options */ });

@WebSocketGateway({ cors: true })
export class ChatGateway {

    constructor(
        private readonly widgetService: WidgetService
    ) {}
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message')
    async handleEvent(@MessageBody() message: MessageDto): Promise<any> {
        if (message.agent) {
            return this.sendToAgent(message)
        } 
        //select agent, send message and return data to user 
        const agent = await this.widgetService.selectAgent()
        console.log('agent', agent)
        // message["agent"] = agent
        return { message, agent }
        // return data;
    }

    private sendToAgent(data) {
        console.log('send to agent', data)

        this.server.emit('agent', data)
    }

    
}