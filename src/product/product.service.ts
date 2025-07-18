import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';
import { ProductHelperService } from './product-helper.service';

export interface IProduct {
  id?: number;
  name: string;
  price: number;
  sku: string;
}

@Injectable()
export class ProductService {
  private prisma = new PrismaClient();

  constructor(private readonly helperService: ProductHelperService) {}

  async create(data: IProduct): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  async findAll(): Promise<(Product & { missingLetter: string })[]> {
    const products = await this.prisma.product.findMany({
      orderBy: { name: 'asc' },
    });
    return products.map(product => ({
      ...product,
      missingLetter: this.helperService.getMissingLetter(product.name),
    }));
  }

  async findOne(id: number): Promise<(Product & { missingLetter: string })> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Produto com id ${id} não encontrado`);
    }
    return {
      ...product,
      missingLetter: this.helperService.getMissingLetter(product.name),
    };
  }

  async update(id: number, data: Partial<IProduct>): Promise<Product> {
    await this.findOne(id); // to check if exists
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Product> {
    await this.findOne(id); // to check if exists
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
