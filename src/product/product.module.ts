import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductHelperService } from './product-helper.service';
import { ProductCreateService } from './services/product-create.service';
import { ProductReadService } from './services/product-read.service';
import { ProductUpdateService } from './services/product-update.service';
import { ProductDeleteService } from './services/product-delete.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    ProductHelperService,
    ProductCreateService,
    ProductReadService,
    ProductUpdateService,
    ProductDeleteService,
  ],
  exports: [
    ProductCreateService,
    ProductReadService,
    ProductUpdateService,
    ProductDeleteService,
  ],
})
export class ProductModule {}
