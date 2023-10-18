import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';
import { CardDto, ChargePayment, CreateCardDto, CreatePayment, CreatePaymentIntentDto, CreateStripeDto, SubscriptionDto } from './dtos/stripe.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly stripeService: StripeService) {}



  @Post('/create-customer')
  create(@Body() body: CreateStripeDto) {
    return this.stripeService.createCustomer(body);
  }
  @Post('create-payment-intent')
  async createPaymentIntent(@Body() createPaymentIntentDto: CreatePaymentIntentDto) {
    const { amount, currency } = createPaymentIntentDto;
    const paymentIntent = await this.stripeService.createPaymentIntent(amount, currency);
    return { client_secret: paymentIntent.client_secret };
  }
  // @Post('add-payment-method')
  // setDefaultCard(@Body() body: CreateCardDto) {
  //   const result = this.stripeService.createPaymentMethod(body);
  //   return result;
  // }

  @Post('/link-card')
  createCard(@Body() body: CardDto) {
    return this.stripeService.addCustomerCard(body);
  }

  // @Post('/payment')
  // createPayments(@Body() paymentRequestBody: CreatePayment) {
  //   return this.stripeService.createPayment(paymentRequestBody);
  // }

  @Post('/charge')
  charge(@Body() chargeBody: ChargePayment ) {
    return this.stripeService.charge(chargeBody);
  }

  // @Post('subscribe')
  // async subscribeToPlan(@Body() body: SubscriptionDto) {
  //   let data = await this.stripeService.purchaseOneTimePlan(body);
  //   return data;
  // }

}