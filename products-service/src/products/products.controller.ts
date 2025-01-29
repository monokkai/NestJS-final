import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { ProductsGuard } from './guard/products.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  @UseGuards(ProductsGuard)

  @Post('new')
  public createProduct(@Body() productData: ProductDto): Promise<Product> {
    return this.productsService.createProduct(productData)
  }

  @Get('searchall')
  public async readAllProduct(): Promise<Array<Product>> {
    return await this.productsService.readAllProduct();
  }

  @Get('searchid=:id')
  public async readOneByIdProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return await this.productsService.readOneByIdProduct(id);
  }

  @Patch('update=:id')
  public async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() productData: ProductDto): Promise<UpdateResult> {
    return await this.productsService.updateProduct(id, productData)
  }

  @Delete('remove=:id')
  public async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.productsService.deleteProduct(id);
  }
}
