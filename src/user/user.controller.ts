import { Controller, Post, Body,Get,Delete ,Param, Global, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetailsEntity } from './entities/user.entity';
import { UserDetails } from './entities/user.interface';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from './jwt-auth.guard';



@Controller('user')
@UseGuards(JwtAuthGuard)
@Global()
export class UserController {
  constructor(
    private readonly userService: UserService) {}

  @Get('/all')
  
  async getAllUsers(): Promise<UserDetails[]> {
    return this.userService.getAllUsers();
  }
  @Delete(':id')
  deleteUser(@Param('id') id:number): Observable<DeleteResult>{
    return this.userService.deleteUser(id);
  }
}
