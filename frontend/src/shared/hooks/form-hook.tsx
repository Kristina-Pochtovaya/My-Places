import { useCallback, useReducer } from 'react';
import { actionType } from '../../places/pages/NewPlace';

type elementType = {
    value: string,
    isValid: boolean
};
export interface initialInputsInterface {
    title?: elementType,
    description?: elementType,
    address? : elementType,
    email?: elementType,
    password?: elementType,
    name?: elementType,
    image?: elementType,
}

interface Action {
    type: actionType;
    value?: string;
    inputs?: initialInputsInterface;
    formIsValid?: boolean;
    isValid?: boolean;
    inputId?: string;
}

export interface State {
    inputs: initialInputsInterface,
    isValid?: boolean;
}

const formReducer = (state: State, action: Action) => {
    switch (action.type) {
        case actionType.INPUT_CHANGE:
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (!state.inputs[inputId]) {
                    continue;
                }
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid },
                },
                isValid: formIsValid,
            }

        case actionType.SET_DATE:
            return {
                inputs: action.inputs,
                isValid: action.formIsValid,
            }

        default:
            return state;
    }
};

export const useForm = (initialInputs: initialInputsInterface, initialFormValidity: boolean):
    [
        formState: State,
        inputHandler: (id: string, value: string, isValid: boolean) => void,
        setFormData: (inputData: initialInputsInterface, formValidity: boolean) => void,
    ] => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity,
    });

    const inputHandler = useCallback((id: string, value: string, isValid: boolean) => {
        dispatch({ type: actionType.INPUT_CHANGE, value: value, isValid: isValid, inputId: id })
    },[]);

    const setFormData = useCallback((inputData: initialInputsInterface, formValidity: boolean) => {
        dispatch({ type: actionType.SET_DATE, inputs: inputData, formIsValid: formValidity })
    }, []);

    return [ formState, inputHandler, setFormData ];
};