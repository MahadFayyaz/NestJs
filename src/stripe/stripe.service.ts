import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import {
  CardDto,
  Charges,
  CreateCardDto,
  CreatePayment,
  CreateStripeDto,
  SubscriptionDto,
} from './dtos/stripe.dto';
@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-08-16', // Use the latest version available
    });
  }

  async createCustomer(body: CreateStripeDto): Promise<Stripe.Customer> {
    try {
      const customer = await this.stripe.customers.create(body);
      return customer;
    } catch (error: unknown | any) {
      throw new HttpException(
        error?.response?.body?.errors[0]?.message || error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createPaymentIntent(amount: number, currency: string) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency,
    });
    return paymentIntent;
  }

  async addCustomerCard(
    body: CardDto,
  ): Promise<Stripe.Customer | Stripe.DeletedCustomer> {
    try {
      const { cardToken, customerId } = body;
      await this.stripe.customers.createSource(customerId, {
        source: cardToken,
      });

      const customer = await this.stripe.customers.retrieve(customerId);
      return customer;
    } catch (error: unknown | any) {
      throw new HttpException(
        error?.response?.body?.errors[0]?.message || error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // public async createPaymentMethod(payload: CreateCardDto) {
  //   try {
  //     const createCard = await this.stripe.paymentMethods.create({
  //       type: 'card',
  //       card: {
  //         number: payload.cardNumber,
  //         exp_month: payload.exp_month,
  //         exp_year: payload.exp_year,
  //         cvc: payload.cvc,
  //       },
  //     });
  //     return createCard;
  //   } catch (error: unknown | any) {
  //     throw new HttpException(
  //       error?.response?.body?.errors[0]?.message || error.message,
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  // async createPayment(paymentRequestBody: CreatePayment): Promise<any> {
  //   let sumAmount = 0;
  //   paymentRequestBody.products.forEach((product) => {
  //     sumAmount = sumAmount + product.price * product.quantity;
  //   });

  //   return this.stripe.paymentIntents.create({
  //     amount: sumAmount * 100,
  //     currency: paymentRequestBody.currency,
  //   });
  // }

  async charge(charges: Charges): Promise<any> {
    const stripe = require('stripe')(
      'sk_test_51NyCmTL0daMYXorKrKzwY2rJ7RDnYxyPjqmeJERXSbpA4PaZJke07CJLexEj4Nd8rzLY6AtWOv8j9beWLfGLprmw009dNDKymQ',
    );

    const charge = await stripe.charges.create({
      amount: charges.amount*100,
      currency: charges.currency,
      customer: charges.customerID,
      description:
        'My First Test Charge (created for API docs at https://www.stripe.com/docs/api)',
    });
  }
}
