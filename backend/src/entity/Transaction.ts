import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./Person";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    amount: number;

    @Column()
    balanceAfter: number;

    @Column({nullable: true})
    description: string;

    @Column()
    types: string;

    @ManyToOne(() => Person, {
        eager: true,
        cascade: true
    })
    resident: Person;
}