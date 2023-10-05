import { Injectable,NotFoundException,UnauthorizedException,ConflictException,Global } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserDetailsEntity } from './entities/user.entity';
import { UserDetails } from './entities/user.interface';
import { Observable, from } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // Add this line
import { CreateUserDto, LoginUserDto } from './dtos/user.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserDetailsEntity)
    private userRepository: Repository<UserDetails>,
    private jwtService: JwtService,  
  ) {}

  async getAllUsers(): Promise<UserDetails[]> {
    return await this.userRepository.find();
  }

  async createUser(userData: CreateUserDto): Promise<UserDetails> {
    console.log("in create user");
    
    const { username, email, password } = userData;
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      posts: [],
    });
    return await this.userRepository.save(user);
  }

  
  async signIn(userData: LoginUserDto) {
    const { email, password } = userData;
    const   user = await this.userRepository.findOne({ where: { email } });

    if (!user) {  
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async findByEmail(email: string): Promise<UserDetails> {
    return this.userRepository.findOne({ where: { email } });
  }
  
  deleteUser(id:number):Observable<DeleteResult>{
    return from(this.userRepository.delete(id))
  }
}
