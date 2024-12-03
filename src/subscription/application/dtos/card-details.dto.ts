import { IsNotEmpty, Length, Matches } from 'class-validator';

export class CardDetailsDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Length(16, 16)
  @Matches(/^\d{16}$/, {
    message: 'card_number must be a 16-digit numeric string',
  })
  card_number: string;

  @IsNotEmpty()
  @Matches(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: 'expiry_date must be in MM/YY format',
  })
  expiry_date: string;

  @IsNotEmpty()
  @Length(3, 3)
  @Matches(/^\d{3}$/, { message: 'cvv must be a 3-digit numeric string' })
  cvv: string;
}
