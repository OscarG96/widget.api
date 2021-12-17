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

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '180496Mega-',
    database: 'chatWidget',
    entities: [User, Room, Message, Participants],
    synchronize: true,
  }),
],
  controllers: [AppController, WidgetController, SocketController],
  providers: [AppService, WidgetService, SocketService, ChatGateway],
})
export class AppModule {}
