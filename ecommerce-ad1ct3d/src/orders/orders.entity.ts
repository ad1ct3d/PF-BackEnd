import { OrderDetail } from '../orderDetails/orderDetails.entity';
import { User } from '../users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: 'date';

  @ManyToOne(() => User, (user) => user.order, { cascade: true })
  @JoinColumn()
  user: User;

  @OneToOne(() => OrderDetail, {
    cascade: true,
  })
  @JoinColumn()
  orderDetail: OrderDetail;
}
