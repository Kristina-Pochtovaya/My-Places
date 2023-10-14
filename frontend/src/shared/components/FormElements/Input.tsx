import React, {useEffect, useReducer} from 'react';
import {validate, validatorType} from '../../../util/validators';
import './Input.scss';

export enum elementType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
}

enum actionType {
    CHANGE = 'change',
    TOUCH = 'touch',
}

export type Props = {
    id?: string;
    element: elementType;
    label: string;
    type?: string;
    placeholder?: string;
    rows?: number;
    errorText?: string;
    validators?: [ { type: validatorType, val?: number }]
    onInput?: (id: string, value: string, isValid: boolean) => void;
    initialValue?: string;
    initialValid?: boolean;
};

interface Action {
    type: actionType;
    val?: string;
    validators?:  [ { type: validatorType, val?: number }]
}

interface State {
    value: string;
    isValid: boolean;
    isTouched: boolean;
}

const inputReducer = (state: State, action: Action ) => {
    switch (action.type) {
        case actionType.CHANGE:
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators),
            };
        case actionType.TOUCH:
            return {
                ...state,
                isTouched: true,
            };
        default:
            return state;
    }
};

export const Input = (props: Props) => {
    const [inputState, dispatch] = useReducer(inputReducer,
        { value: props.initialValue || '', isValid: props.initialValid || false, isTouched: false });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    },[id, onInput, value, isValid]);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({
            type: actionType.CHANGE,
            val: event.target.value,
            validators: props.validators,
        })
    };

    const touchHandler = () => {
        dispatch({
            type: actionType.TOUCH,
        })
    };

    const element = props.element === elementType.INPUT
        ? (<input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
        />)
            : (<textarea
                id={props.id}
                rows={props.rows || 3}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
            />)

    return <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
        <label htmlFor={props.id}>{props.label}</label>
        {element}
        {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
};
