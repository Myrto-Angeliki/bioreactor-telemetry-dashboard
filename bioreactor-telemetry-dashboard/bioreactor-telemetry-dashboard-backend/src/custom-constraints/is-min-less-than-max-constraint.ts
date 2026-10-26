import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";


@ValidatorConstraint({ name: 'IsMinLessThanMaxConstraint', async: false })
export class IsMinLessThanMaxConstraint
  implements ValidatorConstraintInterface
{
  validate(value : any, args: ValidationArguments) {
    const { minimumAllowedValue, maximumAllowedValue } = value;
    if (minimumAllowedValue == null || maximumAllowedValue == null) {
        return true; 
    }

    return minimumAllowedValue < maximumAllowedValue;
  }

  defaultMessage(args: ValidationArguments) {
    return `threshold minimum allowed value must be less than maximum allowed value`;
  }
}