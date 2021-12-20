import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Agent {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;

    @Column("text")
    email: string;

    @Column("text")
    company: string;
}