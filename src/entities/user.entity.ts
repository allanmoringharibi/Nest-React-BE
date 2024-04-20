import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  fullName: string;

  @Column({ type: 'text', nullable: true })
  previousValue: string;

  @Column({ type: 'text', nullable: true })
  newValue: string;

  @Column({ type: 'text', nullable: true })
  userName: string;

  @Column({ type: 'timestamptz', nullable: true })
  timestamp: Date;
}
