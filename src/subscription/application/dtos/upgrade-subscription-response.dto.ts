import { SubscriptionEntity } from 'src/subscription/domain/entities/subscription.entity';

export class UpgradeSubscriptionResponseDto {
  status: string;
  subscription_id?: string;
  expiration_ts?: number;
  message?: string;

  constructor(
    status: string,
    message: string,
    subscription?: SubscriptionEntity,
  ) {
    this.status = status;
    this.message = message;
    this.subscription_id = subscription?.subscription_id;
    this.expiration_ts = subscription?.expiration_ts;
  }
}
