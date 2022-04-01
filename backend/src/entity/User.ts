import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm";

@Entity()
@Unique(['username'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    passw: string;

    @Column()
    role: roleEnum;

}

enum roleEnum{
    admin, user
}
