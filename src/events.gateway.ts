import { Logger } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
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
        this.logger.log('HandleMessage', message)
        let agent = { uid: '' }
        if (!message.agent) {
            agent = await this.agentSerive.selectAgent()
            this.logger.log(`AgentSelected -- ${agent.uid}`)
            this.agentAssigned({ uuid: message.uuid, agent: agent.uid })
        } 
        return this.sendToAgent(message, agent.uid)
        // const event = 'message'
        // return this.server.emit(`server-${}`)
        // return data;
    }

    private sendToAgent(message, agent) {
        this.logger.log(`Message to Agent ${JSON.stringify(message)}`)
        this.server.emit(`agent-${agent}`, message)
    }

    private agentAssigned(data: any): any {
        return this.server.emit(`agent-assigned-${data.uuid}`, data)
    }

    @SubscribeMessage('message-agent')
    async handleMessageAgent(@MessageBody() data: any): Promise<any> {
        console.log('message', data)
        return this.server.emit(`messageFromAgent-${data.uuid}`, data.message)
        // return data;
    }

    
    
}