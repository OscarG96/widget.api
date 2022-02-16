import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from '../entities/Agent';
import { Repository } from 'typeorm';
import { Logger } from "@nestjs/common";
import { getManager } from "typeorm";
import { getRepository } from 'typeorm';

@Injectable()
export class AgentService {
    constructor(
        @InjectRepository(Agent)
        private agentRepository: Repository<Agent>
    ) {}
    private logger: Logger = new Logger('AgentService')

    async createOne(agent: any): Promise<any> {
        this.logger.log('Creating agent', agent.email)
        const agentRegistered = await this.getOne(agent.uid)
        if (!agentRegistered) {
            return this.agentRepository.save(agent)
        }
    }

    getOne(uid: string): any {
        return this.agentRepository.findOne({uid: uid})
    }

    setOnline(uid: string, online: boolean): any {
        return this.agentRepository.update({uid}, { online })
    }

    async selectAgent(): Promise<any> {
        // const entityManager = getManager(); 
        // return entityManager.createQueryBuilder().select("MIN(agent.connections)", "min").from(Agent, "agent");
        // return entityManager.query('SELECT * FROM agent ORDER BY connections ASC LIMIT 1', [])
        this.logger.log('SelectingAgent')
        const agent = await getRepository(Agent)
        .createQueryBuilder('agent')
        .where('agent.online = :online', { online: true })
        .orderBy('connections', 'ASC')
        .limit(1)
        .getOne()
        return agent
    }

    
}
