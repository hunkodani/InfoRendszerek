import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./Transaction";

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    accountBalance: number;

    @Column()
    isResident: boolean;

    @OneToMany(() => Transaction, transaction => transaction.resident)
    transaction: Transaction[];

}