import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway({ cors: true })
export class ChatGateway {
    @SubscribeMessage('message')
    handleEvent(@MessageBody() data: string): string {
        console.log("message events gateway", data)
        return data;
    }
}