import { ProductCreateService } from '../../modules/product/services/product-create.service';
import { Product } from '@prisma/client';
import { IProduct } from '../../modules/product/interfaces/IProduct';

const mockCreate = jest.fn();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    product: {
      create: mockCreate,
    },
  })),
}));

describe('ProductCreateService', () => {
  let service: ProductCreateService;

  beforeEach(() => {
    service = new ProductCreateService();
    jest.clearAllMocks();
  });

  it('deve criar um produto com os dados corretos', async () => {
    const input: IProduct = {
      name: 'Tênis Esportivo',
      price: 199.9,
      sku: 'TENIS-001',
    };

    const output: Product = {
      id: 1,
      name: input.name,
      price: input.price,
      sku: input.sku,
    };

    mockCreate.mockResolvedValue(output);

    const result = await service.create(input);

    expect(mockCreate).toHaveBeenCalledWith({ data: input });
    expect(result).toEqual(output);
  });
});
