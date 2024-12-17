import { CardDetailsDto } from './card-details.dto';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpgradeSubscriptionPayloadDto {
  @IsNotEmpty()
  subscriptionId: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CardDetailsDto)
  cardDetails: CardDetailsDto;
}
