import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';
import { ProductHelperService } from '../product-helper.service';

@Injectable()
export class ProductReadService {
  private prisma = new PrismaClient();

  constructor(private readonly helperService: ProductHelperService) {}

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
}
