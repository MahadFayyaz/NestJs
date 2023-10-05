import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetailsEntity } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { SendGridTransport } from 'nodemailer-sendgrid-transport';
@Module({
  imports:[
    TypeOrmModule.forFeature([UserDetailsEntity]),
    PassportModule,
    JwtModule.register({
      global:true,
      secret: 'this is a jwt key',
      signOptions: { expiresIn: '1h' },
    }),
    MailerModule.forRoot({
      transport: SendGridTransport({
        auth: {
          api_key: 'SENDGRID_API_KEY',
        },
      }),
      defaults: {
        from: 'fayazmahad675@gmail.com',
      },
    }),
  ],
  controllers: [UserController,AuthController],
  providers: [UserService,JwtStrategy],
  exports: [JwtModule],
})
export class UserModule {}
