import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PaymentSuccess } from './models/payment-success.model';
import { PaymentFailure } from './models/payment-failure.model';
import { CardDetailsDto } from '../application/dtos/card-details.dto';
import { UpgradeSubscriptionPayloadDto } from '../application/dtos/upgrade-subscription-payload.dto';
import { lastValueFrom } from 'rxjs';
import { SubscriptionEntity } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { SubscriptionPackageEntity } from './entities/subscription-package.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpgradeSubscriptionResult } from './models/upgrade-subscription-result.model';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepository: Repository<SubscriptionEntity>,
    @InjectRepository(SubscriptionPackageEntity)
    private subscriptionPackageRepository: Repository<SubscriptionPackageEntity>,
  ) {}

  async tryUpgradeSubscription(
    payload: UpgradeSubscriptionPayloadDto,
  ): Promise<UpgradeSubscriptionResult> {
    // TODO: get user id from the request context
    const userId = '1234567890';

    const { subscriptionId, cardDetails } = payload;

    const subscriptionPackage =
      await this.getSubscriptionPackage(subscriptionId);
    if (this.isSubscriptionPackageValid(subscriptionPackage)) {
      return new UpgradeSubscriptionResult(
        'failure',
        'Subscription Package not found',
      );
    }

    const paymentResult = await this.makePayment(cardDetails);
    if (paymentResult instanceof PaymentSuccess) {
      const subscription = await this.upgradeSubscription(
        userId,
        subscriptionPackage,
      );
      return new UpgradeSubscriptionResult(
        'success',
        'Subscription upgraded successfully',
        subscription,
      );
    }

    return new UpgradeSubscriptionResult('failure', 'Payment failed');
  }

  isSubscriptionPackageValid(
    subscriptionPackage: SubscriptionPackageEntity,
  ): boolean {
    return !!subscriptionPackage;
  }

  async getSubscriptionPackage(
    subscriptionId: string,
  ): Promise<SubscriptionPackageEntity> {
    return this.subscriptionPackageRepository.findOne({
      where: { subscription_package_id: subscriptionId },
    });
  }

  async makePayment(
    cardDetails: CardDetailsDto,
  ): Promise<PaymentSuccess | PaymentFailure> {
    const paymentUrl = 'https://payment.gateway.com/api/pay';
    try {
      const response = await lastValueFrom(
        this.httpService.post(paymentUrl, cardDetails),
      );
      const { status, transaction_id, error } = response.data;

      if (status === 'success') {
        return new PaymentSuccess(transaction_id);
      } else if (status === 'failure') {
        return new PaymentFailure(error);
      }
    } catch (error) {
      return new PaymentFailure('Payment processing error: ' + error.message);
    }
  }

  async upgradeSubscription(
    userId: string,
    subscriptionPackage: SubscriptionPackageEntity,
  ): Promise<SubscriptionEntity> {
    const subscription = new SubscriptionEntity();
    subscription.subscription_id = subscriptionPackage.subscription_package_id;
    subscription.user_id = userId;
    subscription.expiration_ts =
      subscriptionPackage.duration.getTime() + new Date().getTime();
    return this.subscriptionRepository.save(subscription);
  }
}
