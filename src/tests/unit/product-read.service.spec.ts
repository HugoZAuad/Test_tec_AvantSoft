import { ProductReadService } from '../../modules/product/services/product-read.service';
import { Product } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

const mockFindMany = jest.fn();
const mockFindUnique = jest.fn();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    product: {
      findMany: mockFindMany,
      findUnique: mockFindUnique,
    },
  })),
}));

describe('ProductReadService', () => {
  let service: ProductReadService;

  beforeEach(() => {
    service = new ProductReadService();
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('deve retornar a lista de produtos ordenada por nome', async () => {
      const products: Product[] = [
        {
          id: 1,
          name: 'Camisa',
          price: 59.9,
          sku: 'CAMISA-01',
        },
        {
          id: 2,
          name: 'Tênis',
          price: 199.9,
          sku: 'TENIS-02',
        },
      ];

      mockFindMany.mockResolvedValue(products);

      const result = await service.findAll();

      expect(mockFindMany).toHaveBeenCalledWith({ orderBy: { name: 'asc' } });
      expect(result).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('deve retornar o produto correspondente ao id', async () => {
      const product: Product = {
        id: 10,
        name: 'Relógio',
        price: 299.9,
        sku: 'RELOGIO-10',
      };

      mockFindUnique.mockResolvedValue(product);

      const result = await service.findOne(10);

      expect(mockFindUnique).toHaveBeenCalledWith({ where: { id: 10 } });
      expect(result).toEqual(product);
    });

    it('deve lançar NotFoundException se o produto não existir', async () => {
      mockFindUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(
        new NotFoundException('Produto com id 999 não encontrado')
      );

      expect(mockFindUnique).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });
});
