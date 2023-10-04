import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetailsEntity } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';




@Module({
  imports:[
    TypeOrmModule.forFeature([UserDetailsEntity]),
    PassportModule,
    JwtModule.register({
      global:true, // Add this block
      secret: 'this is a jwt key', // Change this to a secret key
      signOptions: { expiresIn: '1h' }, // Change the expiration time if needed
    }),
  ],
  controllers: [UserController,AuthController],
  providers: [UserService,JwtStrategy],
  exports: [JwtModule],
})
export class UserModule {}
