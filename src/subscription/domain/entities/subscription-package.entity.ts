import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subscription_packages')
export class SubscriptionPackageEntity {
  @PrimaryGeneratedColumn('uuid')
  subscription_package_id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'datetime' })
  duration: Date;
}
