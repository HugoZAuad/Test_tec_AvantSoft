import { Body, Controller, Post, Get, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductCreateService } from '../services/product-create.service';
import { ProductReadService } from '../services/product-read.service';
import { ProductUpdateService } from '../services/product-update.service';
import { ProductDeleteService } from '../services/product-delete.service';
import { CreateProductDto } from '../dto/create_product.dto';
import { UpdateProductDto } from '../dto/update_product.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createService: ProductCreateService,
    private readonly readService: ProductReadService,
    private readonly updateService: ProductUpdateService,
    private readonly deleteService: ProductDeleteService,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.createService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.readService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.readService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.updateService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.deleteService.remove(id);
  }
}
