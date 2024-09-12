import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { CreateOrderDto } from './createOrder.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('new')
  async addOrder(
    /*     @Param('id', ParseUUIDPipe) id: string, */
    @Body() createOrderDTO: CreateOrderDto,
  ) {
    const { userId, products } = createOrderDTO;
    console.log(products);
    return this.ordersService.addOrder(userId, products);
  }

  @Get(':id')
  async getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrder(id);
  }
}
