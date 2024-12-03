import { PaymentStatus } from './payment-status.model';

export class PaymentSuccess extends PaymentStatus {
  transaction_id: string;
  constructor(transaction_id: string) {
    super('success');
    this.transaction_id = transaction_id;
  }
}
