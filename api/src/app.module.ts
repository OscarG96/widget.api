import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WidgetController } from './widget/widget.controller';
import { WidgetService } from './widget/widget.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User'
import { SocketController } from './socket/socket.controller';
import { SocketService } from './socket/socket.service';
import { ChatGateway } from './events.gateway';
import { Room } from './entities/Room';
import { Message } from './entities/Message';
import { Participants } from './entities/Participants';
import { Agent } from './entities/Agent'
import { UsersModule } from './user/user.module';
import { MessageController } from './message/message.controller';
import { MessageService } from './message/message.service';
import { AgentController } from './agent/agent.controller';
import { AgentService } from './agent/agent.service';
import { AgentModule } from './agent/agent.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '180496Mega-',
    database: 'chatWidget',
    entities: [User, Room, Message, Participants, Agent],
    synchronize: true,
  }), UsersModule, AgentModule, MessageModule
],
  controllers: [AppController, WidgetController, SocketController],
  providers: [AppService, WidgetService, SocketService, ChatGateway],
})
export class AppModule {}
