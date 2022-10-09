import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
    constructor(email: string, username: string, password: string) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', name: 'email', nullable: false, unique: true })
    email: string;

    @Column({ type: 'text', name: 'username', nullable: false })
    username: string;

    @Column({ type: 'text', name: 'password', nullable: false })
    password: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}
