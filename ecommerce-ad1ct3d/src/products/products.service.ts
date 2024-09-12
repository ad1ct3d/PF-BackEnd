import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { PaginationDto } from '../paginator/pagination.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getProducts(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const { results, total } = await this.productsRepository.getProducts(
      page,
      limit,
    );

    return {
      results,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getProductById(id: string) {
    const product = await this.productsRepository.getProductById(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async addProduct(
    createProductDto: CreateProductDto,
    file: Express.Multer.File,
  ) {
    console.log(`product:`, createProductDto);
    if (file) {
      if (!file.mimetype.startsWith('image/')) {
        throw new Error('Invalid file type. Only images allowed');
      }
      const uploadResult = await this.cloudinaryService.uploadImage(file);
      console.log(uploadResult.url);
      createProductDto.imgUrl = uploadResult.url;
    }
    try {
      const newProduct =
        await this.productsRepository.addProduct(createProductDto);
      return { message: 'New product added successfully', product: newProduct };
    } catch (error) {
      throw new Error(`Error adding new product ${error.message}`);
    }
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.getProductById(id);
    if (!product) {
      throw new NotFoundException(`product with id ${id} not found`);
    }

    const updatedProduct = { ...product, ...updateProductDto };

    await this.productsRepository.updateProduct(updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: string) {
    const product = await this.productsRepository.getProductById(id);
    if (!product) {
      throw new NotFoundException(`product with id ${id} not found`);
    }

    await this.productsRepository.deleteProduct(id);

    return { message: 'product deleted successfully' };
  }
}
