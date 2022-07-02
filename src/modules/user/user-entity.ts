import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm"
import argon2 from 'argon2';
import { IsEmail, IsString, Length, MinLength } from "class-validator";
import { IsEqualTo } from "@/utils/isequalto.decorator";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column()
    @Length(3,20, {
        message: 'First name should be between 3 to 20 characters long.'
    })
    firstName: string

    @Column()
    @Length(3,20, {
        message: 'Last name should be between 3 to 20 characters long.'
    })
    lastName: string

    @Column({ unique: true })
    @IsEmail()
    email: string

    @Column({})
    @MinLength(8, {
        message: 'Password should be at least 8 characters long.'
    })
    password: string

    @BeforeUpdate()
    @BeforeInsert()
    async hashPassword() {
        if (!!this.password) {
            const hash = await argon2.hash(this.password);   
            this.password = hash;
        }
        return;
    }

    @IsString()
    @IsEqualTo('password')
    @MinLength(8, {
        message: 'Password should be at least 8 characters long.'
    })
    passwordConfirmation: string;

    @Column({ nullable: true })
    verificationCode: string

    @Column({ type: 'text', nullable: true })
    passwordResetCode: string | null

    @Column({ default: false })
    verified: boolean

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
}
