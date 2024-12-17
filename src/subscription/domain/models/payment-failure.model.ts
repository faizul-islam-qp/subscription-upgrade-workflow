import { PaymentStatus } from './payment-status.model';

export class PaymentFailure extends PaymentStatus {
  error: string;
  constructor(error: string) {
    super('failure');
    this.error = error;
  }
}
