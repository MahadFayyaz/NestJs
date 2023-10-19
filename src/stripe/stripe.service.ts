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
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entity/stripe.entity';
import { Repository } from 'typeorm';
@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService, 
    @InjectRepository(Transaction)
  private readonly transactionRepository: Repository<Transaction>,) {
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

      const { amount, currency } = body;
      const chargeResponse = await this.charge({
        amount, // Provide the appropriate amount
        currency, // Provide the appropriate currency
        customerID: customerId,
      });
  

      return customer;
    } catch (error: unknown | any) {
      throw new HttpException(
        error?.response?.body?.errors[0]?.message || error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async charge(charges: Charges): Promise<any> {
    const stripe = require('stripe')(
      'sk_test_51NyCmTL0daMYXorKrKzwY2rJ7RDnYxyPjqmeJERXSbpA4PaZJke07CJLexEj4Nd8rzLY6AtWOv8j9beWLfGLprmw009dNDKymQ',
    );


    const charge = await stripe.charges.create({
      amount: charges.amount*100,
      currency: charges.currency,
      customer: charges.customerID,
      // userID:charges.userID,
      description:
        'My First Test Charge (created for API docs at https://www.stripe.com/docs/api)',
    });

    const transactionData = {
      UserIDfrom: charges.customerID,
      amount: charges.amount,
      chargeID: charge.id,
      // userId:charges.userId,
      
    };
  
    const transaction = this.transactionRepository.create(transactionData);
    await this.transactionRepository.save(transaction);
    return charge;
  }
}
