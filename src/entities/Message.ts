import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Room } from "./Room"

@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    sender: string;

    @Column('text')
    receiver: string;

    @Column('text')
    message: string;

    @Column('text')
    date: Date

}