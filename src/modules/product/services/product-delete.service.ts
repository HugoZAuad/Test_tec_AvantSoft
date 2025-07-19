import { Injectable } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';

@Injectable()
export class ProductDeleteService {
  private prisma = new PrismaClient();

  async remove(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
