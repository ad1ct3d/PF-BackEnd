import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { UsersRepository } from '../users/users.repositry';
import { ProductsRepository } from '../products/products.repository';
import { Order } from './orders.entity';
import { OrderDetail } from '../orderDetails/orderDetails.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/products.entity';
import { User } from '../users/users.entity';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly usersRepository: UsersRepository,
    private readonly productsRepository: ProductsRepository,

    @InjectRepository(Order)
    private readonly ordersRepositoryDB: Repository<Order>,
  ) {}

  async addOrder(
    userId: string,
    products: { id: string; stock: boolean }[],
  ): Promise<Order> {
    const user = await this.usersRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const order = new Order();
    order.user = user;

    const orderDetail = new OrderDetail();

    orderDetail.total = 0; // Inicializa el total a 0

    for (const productData of products) {
      const product = await this.productsRepository.getProductById(
        productData.id,
      );
      if (!product || product.stock === false) {
        throw new NotFoundException(`Product does not exist or out of stock.`);
      }
      orderDetail.product = product;
      const price = Number(product.price);

      if (!Number.isNaN(price)) {
        orderDetail.total += price;
      } else {
        console.error(
          'El precio del producto no es un número válido:',
          product.price,
        );
      }

      order.orderDetail = orderDetail;

      product.stock = false;
      await this.productsRepository.updateProduct(product);
    }

    const newOrder = this.ordersRepositoryDB.create(order);
    console.log('NEW ORDER = ', newOrder);
    await this.ordersRepositoryDB.save(newOrder);

    console.log(newOrder.id);

    return this.ordersRepositoryDB.findOne({
      where: { id: newOrder.id },
    });
  }

  async getOrder(id: string): Promise<Order> {
    const order = await this.ordersRepositoryDB.findOne({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} does not exist`);
    }
    return order;
  }
}
