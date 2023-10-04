import { Controller, Post, Body,Get,Delete ,Param, Global, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetailsEntity } from './entities/user.entity';
import { UserDetails } from './entities/user.interface';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from './jwt-auth.guard';


@Controller('auth')

export class AuthController {
  constructor(
    private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() userData: UserDetails) {
    console.log("in auth");
    
    return await this.userService.createUser(userData);
  }
  @Post('signin')
  async signIn(@Body() userData: { email: string; password: string }) {
    const accessToken = await this.userService.signIn(userData);
  return { accessToken };
  }
}
