import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorHandlerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      next();
    } catch (error) {
      console.error('Erro capturado pelo middleware:', error);
      const status = error.status || 500;
      const message = error.message || 'Erro interno do servidor';
      res.status(status).json({
        statusCode: status,
        message: message,
      });
    }
  }
}
