import { Entity,PrimaryGeneratedColumn,Column} from 'typeorm'; 

@Entity('feed_post')
export class FeedPostEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({default :''})
    body: String;

    @Column({type: 'timestamp', default:()=> 'CURRENT_TIMESTAMP'})
    createdAt: Date;
    
}