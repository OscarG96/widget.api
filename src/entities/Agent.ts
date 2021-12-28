import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Agent {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    displayName: string;

    @Column("text")
    email: string;

    @Column({ nullable: true, type: 'text' })
    company: string;

    @Column("text")
    uid: string;
}