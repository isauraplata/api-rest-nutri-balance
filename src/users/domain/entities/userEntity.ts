import { Entity, Column } from "typeorm";
import { BaseEntity } from "../../../database/BaseEntity";

@Entity()
export class User extends BaseEntity {
  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "date" })
  dateOfBirth!: Date; // Para almacenar la fecha de nacimiento

  @Column({ type: "int" })
  height!: number; // Altura en cm

  @Column({ type: "int" })
  weight!: number; // Peso en kg

  @Column({type:"json"}) // Para almacenar un array de condiciones médicas
  medicalConditions!: string[];

  @Column({type:"json"}) // Para almacenar un array de alergias
  allergies!: string[];

  @Column({type:"json"}) // Para almacenar un array de alimentos preferidos
  preferredFood!: string[];

  @Column({ type: "enum", enum: ['free', 'premium'] })
  subscriptionType!: 'free' | 'premium'; // Tipo de suscripción

}