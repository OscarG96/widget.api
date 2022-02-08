import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { Agent } from '../entities/Agent';
import { getManager } from "typeorm";

@Injectable()
export class WidgetService {
    constructor() { }

    // saveMessage(message: string, email: string) {
    //     const user = this.userService.getOne(email)
    //     //check if user is assigned to a room, if not assign them
    //     // const room = 
    //     const messageToSave = {
    //         message,
    //         user
    //     }
    //     return this.messageRepository.save(messageToSave)
    // }
    async selectAgent(): Promise<any> {
        const entityManager = getManager(); 
        // return entityManager.createQueryBuilder().select("MIN(agent.connections)", "min").from(Agent, "agent");
        return entityManager.query('SELECT * FROM agent ORDER BY connections ASC LIMIT 1', [])
        // agent.getRawOne();
        // return this.agentRepository.createQueryBuilder().orderBy('RANDOM()').limit(1).execute();
    }
}
