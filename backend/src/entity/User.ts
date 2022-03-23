import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
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
