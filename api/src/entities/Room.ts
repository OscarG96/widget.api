import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Agent } from "./Agent";

@Entity()
export class Room {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;

    @Column("text")
    type: string;

    @OneToOne(type => User)
    @JoinColumn()
    userId: User;

    @OneToOne(type => Agent)
    @JoinColumn()
    agentId: Agent;
}