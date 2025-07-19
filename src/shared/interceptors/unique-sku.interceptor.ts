import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UniqueSkuInterceptor implements NestInterceptor {
  private prisma = new PrismaClient();

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const body = request.body;

    if ((method === 'POST' || method === 'PATCH' || method === 'PUT') && body.sku) {
      const existingProduct = await this.prisma.product.findUnique({
        where: { sku: body.sku },
      });

      if (existingProduct) {
        // For update, allow if the existing product is the same as the one being updated
        if (method !== 'POST' && request.params.id && existingProduct.id === Number(request.params.id)) {
          return next.handle();
        }
        throw new BadRequestException('SKU já está em uso.');
      }
    }

    return next.handle();
  }
}
