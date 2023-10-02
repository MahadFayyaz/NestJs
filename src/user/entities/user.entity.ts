import { FeedPostEntity } from 'src/feed/models/post.entity';
import { FeedPost } from 'src/feed/models/post.interface';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('user')
export class  UserDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
 
  @Column({ nullable: true })
  age: number;
 
  @OneToMany(() => FeedPostEntity, post => post.createdBy) // One user can have many posts
  posts: FeedPostEntity[];

    
}