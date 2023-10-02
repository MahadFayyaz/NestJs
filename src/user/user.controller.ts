import { Controller, Post, Body,Get,Delete ,Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetailsEntity } from './entities/user.entity';
import { UserDetails } from './entities/user.interface';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Observable } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAllUsers(): Promise<UserDetails[]> {
    return this.userService.getAllUsers();
  }

  @Post('signup')
  async signUp(@Body() userData: UserDetails) {
    return this.userService.createUser(userData);
  }
  @Post('signin')
  async signIn(@Body() userData: { email: string; password: string }) {
    return this.userService.signIn(userData);
  }
  @Delete(':id')
  deleteUser(@Param('id') id:number): Observable<DeleteResult>{
    return this.userService.deleteUser(id);
  }
}
