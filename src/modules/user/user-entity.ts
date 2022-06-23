import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: true })
    firstName: string

    @Column({ nullable: true })
    lastName: string

    @Column()
    email: string


    constructor(username: string, lastName: string, email: string){
        super();
        this.firstName = username;
        this.lastName = lastName;
        this.email = email;
    }

}
