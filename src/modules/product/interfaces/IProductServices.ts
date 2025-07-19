import { IProduct } from './IProduct';

export interface IProductService {
  create(data: IProduct): Promise<any>;
  findAll(): Promise<any[]>;
  findOne(id: number): Promise<any>;
  update(id: number, data: Partial<IProduct>): Promise<any>;
  remove(id: number): Promise<any>;
}
