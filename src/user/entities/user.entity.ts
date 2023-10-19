import { FeedPostEntity } from 'src/feed/models/post.entity';
import { FeedPost } from 'src/feed/models/post.interface';
// import { UserSubscription } from 'src/stripe/entity/stripe.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('user')
export class  UserDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
 
  @Column({ nullable: true })
  age: number;
 
  @Column({ nullable: true })
  customerID: string;
 
  @OneToMany(() => FeedPostEntity, post => post.createdBy) // One user can have many posts
  posts: FeedPostEntity[];

  //   @OneToMany(() => UserSubscription, (subscription) => subscription.author, {
  //   cascade: true,
  //   onDelete: 'CASCADE',
  // })
  // subscriptions: UserSubscription[];

}