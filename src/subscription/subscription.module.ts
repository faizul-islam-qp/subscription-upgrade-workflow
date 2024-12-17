import { Module } from '@nestjs/common';
import { SubscriptionService } from './domain/subscription.service';
import { SubscriptionEntity } from './domain/entities/subscription.entity';
import { SubscriptionPackageEntity } from './domain/entities/subscription-package.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionController } from './application/subscription.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriptionEntity, SubscriptionPackageEntity]),
  ],
  providers: [SubscriptionService],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
