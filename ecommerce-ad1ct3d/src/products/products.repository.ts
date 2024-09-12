import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './products.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProducts(
    page: number,
    limit: number,
  ): Promise<{ results: Product[]; total: number }> {
    const [results, total] = await this.productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { results, total };
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product || product.stock == false) {
      throw new NotFoundException(`Product does not exist or out of stock`);
    }
    return product;
  }

  async addProduct(productData: CreateProductDto): Promise<Product> {
    console.log(productData);
    const newProduct = this.productRepository.create(productData);
    return await this.productRepository.save(newProduct);
  }

  async updateProduct(updateProductDto: UpdateProductDto): Promise<void> {
    const { id, stock } = updateProductDto;

    // Verificar si el producto existe
    const existingProduct = await this.productRepository.findOne({
      where: { id },
    });
    if (!existingProduct) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    // Actualizar el stock si está definido en el DTO
    if (stock !== undefined) {
      existingProduct.stock = stock;
    }

    // Guardar el producto actualizado
    await this.productRepository.save(existingProduct);
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    await this.productRepository.delete(id);
  }
}
