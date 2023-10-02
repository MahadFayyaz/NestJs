import { UserDetailsEntity } from 'src/user/entities/user.entity';
import { UserDetails } from 'src/user/entities/user.interface';
import { Entity,PrimaryGeneratedColumn,Column, ManyToOne} from 'typeorm'; 

@Entity('feed_post')
export class FeedPostEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({default :''})
    body: String;

    @Column({type: 'timestamp', default:()=> 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @ManyToOne(() => UserDetailsEntity, user => user.posts) // Many posts can belong to one user
    createdBy: UserDetailsEntity;

}