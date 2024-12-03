import { SubscriptionEntity } from '../entities/subscription.entity';

export class UpgradeSubscriptionResult {
  status: string;
  subscription?: SubscriptionEntity;
  message?: string;

  constructor(
    status: string,
    message: string,
    subscription?: SubscriptionEntity,
  ) {
    this.status = status;
    this.message = message;
    this.subscription = subscription;
  }
}
