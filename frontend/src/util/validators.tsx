export enum validatorType {
    VALIDATOR_TYPE_REQUIRE = 'REQUIRE',
    VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH',
    VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH',
    VALIDATOR_TYPE_MIN = 'MIN',
    VALIDATOR_TYPE_MAX = 'MAX',
    VALIDATOR_TYPE_EMAIL = 'EMAIL',
    VALIDATOR_TYPE_FILE = 'FILE',
}

export const VALIDATOR_REQUIRE = () => ({ type: validatorType.VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: validatorType.VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val: number) => ({
    type: validatorType.VALIDATOR_TYPE_MINLENGTH,
    val: val
});
export const VALIDATOR_MAXLENGTH = (val: string) => ({
    type: validatorType.VALIDATOR_TYPE_MAXLENGTH,
    val: val
});
export const VALIDATOR_MIN = (val: string) => ({ type: validatorType.VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = (val: string) => ({ type: validatorType.VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: validatorType.VALIDATOR_TYPE_EMAIL });

export const validate = (value: string, validators: [ { type: validatorType, val?: number }]) => {
    let isValid = true;
    for (const validator of validators) {
        if (validator.type === validatorType.VALIDATOR_TYPE_REQUIRE) {
            isValid = isValid && value.trim().length > 0;
        }
        if (validator.type === validatorType.VALIDATOR_TYPE_MINLENGTH) {
            isValid = isValid && value.trim().length >= validator.val;
        }
        if (validator.type === validatorType.VALIDATOR_TYPE_MAXLENGTH) {
            isValid = isValid && value.trim().length <= validator.val;
        }
        if (validator.type === validatorType.VALIDATOR_TYPE_MIN) {
            isValid = isValid && +value >= validator.val;
        }
        if (validator.type === validatorType.VALIDATOR_TYPE_MAX) {
            isValid = isValid && +value <= validator.val;
        }
        if (validator.type === validatorType.VALIDATOR_TYPE_EMAIL) {
            isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
        }
    }
    return isValid;
};
