import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }
    private _products: Array<Product> = new Array<Product>;


    public async createProduct(productData: ProductDto): Promise<Product> {
        const product: ProductDto = this.productRepository.create(productData);

        return this.productRepository.save(product);
    }

    public async createProducts(productsData: Array<ProductDto>): Promise<Array<Product>> {
        const products: Array<ProductDto> = this.productRepository.create(productsData);

        return this.productRepository.save(products);
    }

    public async readAllProduct(): Promise<Array<Product>> {
        return this.productRepository.find();
    }

    public async readOneByIdProduct(id: number): Promise<Product> {
        try {
            return this.productRepository.findOneBy({ id });
        } catch {
            throw new BadRequestException("Товар с данным id не найден")
        }
    }

    public async updateProduct(id: number, productData: ProductDto): Promise<UpdateResult> {
        try {
            return this.productRepository.update(id, productData);
        } catch {
            throw new BadRequestException("Товаар с данным id не найден")
        }
    }

    public async deleteProduct(id: number): Promise<DeleteResult> {
        try {
            return this.productRepository.delete(id);
        } catch {
            throw new BadRequestException("Товар с данным id не найден");
        }
    }
}
