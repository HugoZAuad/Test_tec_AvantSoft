import { ProductUpdateService } from '../../modules/product/services/product-update.service';
import { Product } from '@prisma/client';

const mockUpdate = jest.fn();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    product: {
      update: mockUpdate,
    },
  })),
}));

describe('ProductUpdateService', () => {
  let service: ProductUpdateService;

  beforeEach(() => {
    service = new ProductUpdateService();
    jest.clearAllMocks();
  });

  it('deve atualizar um produto com os dados fornecidos', async () => {
    const id = 5;
    const dataToUpdate = {
      name: 'Tênis Corrida',
      price: 219.9,
    };

    const updatedProduct: Product = {
      id,
      name: dataToUpdate.name,
      price: dataToUpdate.price,
      sku: 'TENIS-05',
    };

    mockUpdate.mockResolvedValue(updatedProduct);

    const result = await service.update(id, dataToUpdate);

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id },
      data: dataToUpdate,
    });
    expect(result).toEqual(updatedProduct);
  });
});
