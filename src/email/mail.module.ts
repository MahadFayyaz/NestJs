import { Module } from '@nestjs/common';
import { EmailService } from './mail.service';
import { EmailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
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
  controllers: [EmailController],
  providers: [EmailService]
})
export class EmailModule {}
