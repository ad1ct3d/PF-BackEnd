import { Order } from '../orders/orders.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  birthdate: Date;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: number;

  @Column()
  country: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  role: string = 'default';

  @OneToMany(() => Order, (order) => order.user)
  @JoinColumn()
  order?: Order[];
}
