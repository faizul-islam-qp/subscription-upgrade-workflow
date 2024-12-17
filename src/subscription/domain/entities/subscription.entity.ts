import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('subscriptions')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  subscription_enrollment_id: string;

  @Column({ type: 'varchar', length: 50 })
  subscription_id: string;

  @Column({ type: 'varchar', length: 50 })
  user_id: string;

  @UpdateDateColumn({ name: 'creation_ts', type: 'datetime' })
  creation_ts: number;

  @Column({ name: 'expiration_ts', type: 'datetime' })
  expiration_ts: number;
}
