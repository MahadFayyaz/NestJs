import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { FeedService } from './services/feed.service';
import { FeedController } from './controller/feed.controller';
import { FeedPostEntity } from './models/post.entity';
import { UserDetailsEntity } from 'src/user/entities/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([FeedPostEntity,UserDetailsEntity]),

  ],
  providers: [FeedService],
  controllers: [FeedController]
})
export class FeedModule {}
