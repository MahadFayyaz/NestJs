import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { StripeService } from './stripe.service';
// import { SendGridTransport } from 'nodemailer-sendgrid-transport';

@Module({
  imports: [],

  controllers: [PaymentController],
  providers: [StripeService],
})
export class StripeModule {}
