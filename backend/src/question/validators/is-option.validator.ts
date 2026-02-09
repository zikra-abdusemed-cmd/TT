// src/question/validators/is-option.validator.ts
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isOption', async: false })
export class IsOptionConstraint implements ValidatorConstraintInterface {
    validate(correctAnswer: any, args: any) {
        const options = args.object['options']; // Access the options from the object
        return Array.isArray(options) && options.includes(correctAnswer); // Check if correctAnswer is in options
    }

    defaultMessage(args: any) {
        return `'${args.value}' is not a valid option`; // Error message
    }
}

export function IsOption(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isOption',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsOptionConstraint,
        });
    };
}