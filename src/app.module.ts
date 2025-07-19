import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ProductModule } from './modules/product/product.module';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';
import { ErrorHandlerMiddleware } from './shared/middleware/error-handler.middleware';
import { AuthGuard } from './shared/guards/auth.guard';

@Module({
  imports: [ProductModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, ErrorHandlerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
