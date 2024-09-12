import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../Categories/categories.entity';
import { OrderDetail } from '../orderDetails/orderDetails.entity';
import { IsNumber } from 'class-validator';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @IsNumber()
  price: number;

  // change to number!!
  @Column({ type: 'boolean', nullable: false })
  stock: boolean;

  @Column({ type: 'text', default: 'default-img-url.jpg' })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.prodcut)
  @JoinColumn()
  category: Category;

  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  @JoinColumn()
  orderDetail?: OrderDetail[];
}
