import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsSkuNotAllowed(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isSkuNotAllowed',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value === undefined || value === null;
        },
        defaultMessage(args: ValidationArguments) {
          return 'Alteração do campo SKU não é permitida.';
        },
      },
    });
  };
}
