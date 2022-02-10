import { Logger } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';
import { MessageDto } from "./message/message.dto";
import { WidgetService } from "./widget/widget.service";
import { AgentService } from "./agent/agent.service";

// const io = new Server({ /* options */ });

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    constructor(
        private readonly widgetService: WidgetService,
        private readonly agentSerive: AgentService,
    ) {}

    private logger: Logger = new Logger('WebSocketGateway')

    handleConnection(client: any, ...args: any[]) {
        this.logger.log(`Client connected: ${client.handshake.auth.token}` )
        this.agentSerive.setOnline(client.handshake.auth.token, true)
    }

    handleDisconnect(client: any) {
        this.logger.log(`Client disconnected: ${client.handshake.auth.token}` )
        this.agentSerive.setOnline(client.handshake.auth.token, false)
    }

    

    

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message')
    async handleMessage(@MessageBody() message: MessageDto): Promise<any> {
        console.log('message', message)
        if (message.agent) {
            const _sockets = await this.server.fetchSockets()
            // console.log('_sockets', _sockets)
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

        this.server.emit(`agent-${data.agent}`, data)
    }

    @SubscribeMessage('message-agent')
    async handleMessageAgent(@MessageBody() data: any): Promise<any> {
        console.log('message', data)
        return this.server.emit(`messageFromAgent-${data.uuid}`, data.message)
        // return data;
    }

    
    
}