import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    createOne(user: any): any {
        console.log('user' ,user)
        return this.usersRepository.save(user)
    }

    getOne(email: string): any {
        return this.usersRepository.findOne({email: email})
    }

}

