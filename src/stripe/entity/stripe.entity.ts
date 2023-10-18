// import Model from '@/common/entities/Model.entity';
// import { Users } from '@/users/entities/user.entity';
// import { Column, Entity, ManyToOne } from 'typeorm';

// @Entity('userSubscription')
// export class UserSubscription extends Model {
//   @Column({ type: 'varchar', length: 100 })
//   plan: string;

//   @Column({ type: 'date' })
//   startDate: Date;

//   @Column({ type: 'date' })
//   expiryDate: Date;

//   @Column({ default: 0 })
//   totalUserDefinedQuestion: number;

//   @Column({ default: 0 })
//   consumeUserDefinedQuestion: number;

//   @ManyToOne(() => Users, (user) => user.subscriptions, {
//     onDelete: 'CASCADE',
//   })
//   author: Users;
// }
