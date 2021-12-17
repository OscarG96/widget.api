import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Room } from "./Room"

@Entity()
export class Participants {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    @OneToOne(type => Room)
    @JoinColumn()
    room: Room;

}