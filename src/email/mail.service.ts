// email.service.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  async send(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);
    return transport;
  }
  async sendWelcomeEmail(email: string) {
    const mail = {
      to: email,
      from:`fayazmahad675@gmail.com`,
      templateId:'d-bc49cd314e144aeb8bc3d0010375334f',
    subject: 'Welcome to Our Platform!',
      dynamic_template_data: {
        EMAIL: email,
      },
    };
    const transport = await SendGrid.send(mail);
    return transport;
  }
  async sendResetPasswordOTP(email: string) {
    const mail = {
      to: email,
      from:`fayazmahad675@gmail.com`,
      templateId:'d-bc49cd314e144aeb8bc3d0010375334f',
    subject: 'Welcome to Our Platform!',
      dynamic_template_data: {
        EMAIL: email,
      },
    };

    const transport = await SendGrid.send(mail);

    return transport;
  }
}
