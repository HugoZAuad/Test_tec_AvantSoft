import { IsNumber, IsPositive, IsString, IsOptional } from 'class-validator';
import { IsSkuNotAllowed } from '../../../shared/validators/updateNot-SKU.validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsSkuNotAllowed({
    message: 'Alteração do campo SKU não é permitida.',
  })
  sku?: string;
}
