import { MiddlewareConsumer, Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { OrdersRepository } from './orders.repository';
import User, { UsersRepository } from '../users/users.repositry';
import { ProductsRepository } from '../products/products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/products.entity';
import { OrderDetail } from '../orderDetails/orderDetails.entity';
import { Order } from './orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product, OrderDetail, Order])],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersRepository,
    UsersRepository,
    ProductsRepository,
  ],
  exports: [OrdersRepository],
})
export class OrdersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('orders');
  }
}
