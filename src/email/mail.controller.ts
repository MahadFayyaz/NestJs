import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { EmailService } from './mail.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('email/:to')
  send(@Param('to') to: string) {
    const mail = {
      to: to,
      from:`fayazmahad675@gmail.com`,
      templateId:'d-bc49cd314e144aeb8bc3d0010375334f',
      dynamic_template_data: {
        subject: 'Greeting Message from NestJS Sendgrid',
      },
    };

    return this.emailService.send(mail);
  }
}
