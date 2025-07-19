import { Injectable } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';
import { IProduct } from '../interfaces/IProduct';

@Injectable()
export class ProductUpdateService {
  private prisma = new PrismaClient();

  async update(id: number, data: Partial<IProduct>): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }
}
