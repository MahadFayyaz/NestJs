import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { StripeService } from './stripe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entity/stripe.entity';
// import { SendGridTransport } from 'nodemailer-sendgrid-transport';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  exports: [Transaction],
  controllers: [PaymentController],
  providers: [StripeService,Transaction],
})
export class StripeModule {}
