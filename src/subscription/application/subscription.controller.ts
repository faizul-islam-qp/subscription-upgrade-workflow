import { Body, Controller, Post } from '@nestjs/common';
import { SubscriptionService } from '../domain/subscription.service';
import { UpgradeSubscriptionPayloadDto } from './dtos/upgrade-subscription-payload.dto';
import { UpgradeSubscriptionResponseDto } from './dtos/upgrade-subscription-response.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('upgrade')
  async upgradeSubscription(
    @Body() payload: UpgradeSubscriptionPayloadDto,
  ): Promise<UpgradeSubscriptionResponseDto> {
    const result =
      await this.subscriptionService.tryUpgradeSubscription(payload);
    return new UpgradeSubscriptionResponseDto(
      result.status,
      result.message,
      result.subscription,
    );
  }
}
