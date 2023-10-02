import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../models/post.interface';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserDetailsEntity } from 'src/user/entities/user.entity';
import { FeedPostEntity } from '../models/post.entity';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}
  @Post('post')
  async create(@Body() postData: FeedPostEntity, @Body('createdBy') createdBy: number): Promise<FeedPostEntity> {
    if (!postData.body || !createdBy) {
        throw new HttpException('Both body and createdBy are required', HttpStatus.BAD_REQUEST);
      }
    return await this.feedService.createPost(postData, createdBy);  
  }
  @Get('getAll')
  findAll(): Observable<FeedPost[]> {
    return this.feedService.findAllPosts(); 
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() feedPost: FeedPost,
  ): Observable<UpdateResult> {
    return this.feedService.updatePost(id, feedPost);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.feedService.deletePost(id);
  }
}
