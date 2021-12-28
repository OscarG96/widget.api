import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../entities/Message';
import { UserService } from '../user/user.service';

@Injectable()
export class MessageService {
    // constructor(
    //     @InjectRepository(Message)
    //     private messageRepository: Repository<Message>,
    //     private readonly userService: UserService
    // ) {}

    // saveMessage(message) {
    //     return this.messageRepository.save(message)
    // }
}
