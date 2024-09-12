import { Module } from '@nestjs/common';

//PRODUCTS
import { ProductsModule } from './products/products.module';

//USER
import { UsersModule } from './users/users.module';

//AUTH
import { AuthModule } from './auth/auth.module';

//CLOUDINARY
import { CloudinaryModule } from './cloudinary/cloudinary.module';

//CONFIG
import { ConfigurationModule, dbConfig } from './config/dbConfig.config';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    OrdersModule,
    CloudinaryModule,
    ProductsModule,
    UsersModule,
    AuthModule,
    dbConfig,
    ConfigurationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
