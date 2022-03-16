import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Flat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    floor: number;

    @Column()
    door: number;

    @Column()
    area: number;

    @Column()
    space: number;

    @Column({nullable: true})
    residentId: number;
}