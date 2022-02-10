import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from '../entities/Agent';
import { Repository } from 'typeorm';

@Injectable()
export class AgentService {
    constructor(
        @InjectRepository(Agent)
        private agentRepository: Repository<Agent>
    ) {}

    createOne(agent: any): any {
        console.log('agent', agent)
        const agentRegistered = this.getOne(agent.uid)
        if (!agentRegistered) {
            return this.agentRepository.save(agent)
        }
    }

    getOne(uid: string): any {
        return this.agentRepository.findOne({uid: uid})
    }

    setOnline(uid: string, online: boolean): any {
        return this.agentRepository.update(uid, { online })
    }

    
}
