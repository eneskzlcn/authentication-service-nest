import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  constructor(email: string, username: string) {
    this.email = email;
    this.username = username;
  }
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'text', name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ type: 'text', name: 'username', nullable: false })
  username: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
