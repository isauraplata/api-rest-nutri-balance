import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date; // Usar '!' para indicar que será inicializado por TypeORM

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date; // Usar '!' para indicar que será inicializado por TypeORM

  @Column({ type: 'uuid', unique: true })
  uuid!: string;

  
}