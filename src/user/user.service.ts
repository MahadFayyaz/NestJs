import { Injectable,NotFoundException,UnauthorizedException,ConflictException,Global, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserDetailsEntity } from './entities/user.entity';
import { UserDetails } from './entities/user.interface';
import { Observable, from } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // Add this line
import { CreateUserDto, LoginUserDto } from './dtos/user.dto';
import { EmailService } from '../email/mail.service';
import { StripeService } from 'src/stripe/stripe.service';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserDetailsEntity)
    private userRepository: Repository<UserDetails>,
    private jwtService: JwtService,  
    private readonly mailService: EmailService,
    private readonly stripeService: StripeService,
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
    const name = username;
    const savedUser = await this.userRepository.save(user);
    try {
      const stripeCustomer = await this.stripeService.createCustomer({name,email});
      console.log("Stripe Customer created:", stripeCustomer);

      // Update the user with the customerID
      savedUser.customerID = stripeCustomer.id;
      await this.userRepository.save(savedUser);

    } catch (error) {
      console.error("Error creating Stripe Customer:", error);
      // Handle error appropriately (e.g., throw a specific exception, log it, etc.)
    }

     
    // await this.mailService.sendResetPasswordOTP(email);
    // console.log("hitted2")
    return savedUser;

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


  async sendPasswordResetEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    // const otp = this.generateOTP();

    // //Save OTP in user entity.
    // this.usersService.addOPT(email, otp);

    // Send the password reset email
    await this.mailService.sendResetPasswordOTP(email);
  }
}
