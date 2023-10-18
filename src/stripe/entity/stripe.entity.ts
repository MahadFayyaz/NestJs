import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('TRANSACTIONS') // Specify the table name
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  UserIDfrom: string;

  @Column({ nullable: true })
  amount: number;

  @Column()
  chargeID: string;

  @Column({ nullable: true })
  invoiceNumber: string;
}