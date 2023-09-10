import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Config {
  constructor(name: string, value: JSON) {
    this.name = name;
    this.value = value;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('simple-json')
  value: JSON;
}
