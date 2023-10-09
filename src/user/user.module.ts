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
import { EmailService } from '../email/mail.service';
import { EmailController } from '../email/mail.controller';
// import { SendGridTransport } from 'nodemailer-sendgrid-transport';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDetailsEntity]),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'this is a jwt key',
      signOptions: { expiresIn: '1h' },
    }),
    MailerModule.forRoot({
      // transport: SendGridTransport({
      //   auth: {
      //     api_key: 'SENDGRID_API_KEY',
      //   },
      // }),
      transport: {
        auth: {
          api_key: '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',
        },
      },
      defaults: {
        from: 'fayazmahad675@gmail.com',
      },
    }),
  ],

  controllers: [UserController, AuthController,EmailController],
  providers: [UserService, JwtStrategy,EmailService],
  exports: [JwtModule],
})
export class UserModule {}
