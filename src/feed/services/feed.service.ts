import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm'
import { FeedPostEntity } from '../models/post.entity';
import { FeedPost } from '../models/post.interface'; 
import { Observable, from } from 'rxjs';
import { UserDetailsEntity } from 'src/user/entities/user.entity';
// import { FeedPost } from '../models/post.interface';

@Injectable()
export class FeedService {
    constructor(
        @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
    @InjectRepository(UserDetailsEntity) // Inject UserDetailsEntity repository
    private readonly userRepository: Repository<UserDetailsEntity>, // Add this line
  ) {}

    async createPost(feedPost: FeedPostEntity, createdBy: number): Promise<FeedPostEntity> {
        const user = await this.userRepository.findOne({ where: { id: createdBy}});
        if (!user) {
          throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
        }
    
        feedPost.createdBy = user;
        return await this.feedPostRepository.save(feedPost);
      }

    findAllPosts() : Observable<FeedPost[]> {
        return from(this.feedPostRepository.find({
            relations: ['createdBy'] // Load the createdBy relationship
          }).then(posts => {
            return posts.map(post => {
                return {
                    id:post.id,
                    body: post.body.toString(),
                    createdAt: post.createdAt,
                    createdBy:post.createdBy,
             };
            });
        }));
    }   
    updatePost(id:number, feedPost: FeedPost): Observable<UpdateResult> {
        return from(this.feedPostRepository.update(id,feedPost))
    }
    deletePost(id:number): Observable<DeleteResult>{
        return from(this.feedPostRepository.delete(id))
    }
}
