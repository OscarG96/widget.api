import { Module } from '@nestjs/common';
import { WidgetService } from './widget.service';
import { WidgetController } from './widget.controller';
import { UsersModule } from 'src/user/user.module';
import { Agent } from 'src/entities/Agent';
import { User } from 'src/entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule],
  providers: [WidgetService],
  controllers: [WidgetController]
})
export class MessageModule {}