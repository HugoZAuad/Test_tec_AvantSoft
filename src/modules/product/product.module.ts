import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ProductController } from './controllers/product.controller';
import { ProductCreateService } from './services/product-create.service';
import { ProductReadService } from './services/product-read.service';
import { ProductUpdateService } from './services/product-update.service';
import { ProductDeleteService } from './services/product-delete.service';
import { MissingLetterInterceptor } from '../../shared/interceptors/missing-letter.interceptor';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [

    ProductCreateService,
    ProductReadService,
    ProductUpdateService,
    ProductDeleteService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MissingLetterInterceptor,
    },
  ],
  exports: [
    ProductCreateService,
    ProductReadService,
    ProductUpdateService,
    ProductDeleteService,
  ],
})
export class ProductModule {}
