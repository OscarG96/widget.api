import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';

// const io = new Server({ /* options */ });

@WebSocketGateway({ cors: true })
export class ChatGateway {

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message')
    handleEvent(@MessageBody() data: string): void {
        this.sendToAgent(data)
        // return data;
    }

    private sendToAgent(data) {
        console.log('send to agent', data)
        this.server.emit('agent', data)
    }

    
}