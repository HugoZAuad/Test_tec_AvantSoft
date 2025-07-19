import { Injectable } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';
import { IProduct } from '../interfaces/IProduct';

@Injectable()
export class ProductCreateService {
  private prisma = new PrismaClient();

  async create(data: IProduct): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }
}
