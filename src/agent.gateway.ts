import { Logger } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayInit } from "@nestjs/websockets";
import { Server } from 'socket.io';
import { MessageDto } from "./message/message.dto";
import { WidgetService } from "./widget/widget.service";

// const io = new Server({ /* options */ });

@WebSocketGateway({ cors: true, namespace: 'agent' })
export class AgentGateway implements OnGatewayInit{
    constructor(
        private readonly widgetService: WidgetService
    ) {}

    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('AgentGateway')

    async afterInit(server: any) {
        this.logger.log('Initialized')
        // this.logger.log(await JSON.stringify(this.server.allSockets()))
        this.seeConnections()
    }

    @SubscribeMessage('message')
    async handleEvent(@MessageBody() message: MessageDto): Promise<any> {
        return this.server.allSockets()
        // return data;
    }

    async seeConnections() {
        const connecitons = await this.server.allSockets()
        console.log(connecitons)
    }


    
}