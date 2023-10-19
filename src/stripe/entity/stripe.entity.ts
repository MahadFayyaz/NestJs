import { UserDetailsEntity } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

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

//   @Column({ nullable: true })
//   userId: number;

  @ManyToOne(() => UserDetailsEntity) // Many transactions belong to one user
  @JoinColumn({ name: 'id' }) // Name of the foreign key column in transactions table
  userid: UserDetailsEntity;
}