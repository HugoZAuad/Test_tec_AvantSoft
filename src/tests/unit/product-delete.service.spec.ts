import { ProductDeleteService } from '../../modules/product/services/product-delete.service';
import { Product } from '@prisma/client';

const mockDelete = jest.fn();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    product: {
      delete: mockDelete,
    },
  })),
}));

describe('ProductDeleteService', () => {
  let service: ProductDeleteService;

  beforeEach(() => {
    service = new ProductDeleteService();
    jest.clearAllMocks();
  });

  it('deve deletar um produto pelo id', async () => {
    const idToDelete = 101;

    const deletedProduct: Product = {
      id: idToDelete,
      name: 'Smartphone XYZ',
      price: 1499.0,
      sku: 'XYZ-101',
    };

    mockDelete.mockResolvedValue(deletedProduct);

    const result = await service.remove(idToDelete);

    expect(mockDelete).toHaveBeenCalledWith({ where: { id: idToDelete } });
    expect(result).toEqual(deletedProduct);
  });
});
