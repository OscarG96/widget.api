import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';

@Injectable()
export class WidgetService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    createOne(user: any): Promise<User> {
        return this.usersRepository.create(user)
    }
}
