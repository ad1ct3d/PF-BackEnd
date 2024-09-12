import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { RolesGuard } from '../users/roles/roles.guard';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from '../users/roles/roles.decorator';
import { PaginationDto } from '../paginator/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('products')
@Controller('products')
@ApiBearerAuth('access-token')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Get(':page')
  getProducts(
    @Query() paginationDto: PaginationDto,
    @Param('page', ParseIntPipe) page: number,
  ) {
    const { limit = 5 } = paginationDto;
    const products = this.ProductsService.getProducts({ page, limit });
    return products;
  }

  @Get('id/:id')
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.ProductsService.getProductById(id);
  }

  @Post('new')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @UseGuards(RolesGuard)
  @Roles('admin')
  addProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(Body);
    console.log('Received CreateProductDto:', createProductDto);
    console.log('Received File:', file);
    return this.ProductsService.addProduct(createProductDto, file);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  updatedProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.ProductsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  deleteProduct(@Param('id') id: string) {
    return this.ProductsService.deleteProduct(id);
  }
}
