import React, { useContext, useState } from 'react';
import { Card } from '../../shared/components/UIElements/Card';
import { elementType, Input } from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { methodType, useHttpClient } from '../../shared/hooks/http-hook';
import { ImageUpload } from '../../shared/components/FormElements/ImageUpload';
import './Auth.scss';

enum authMode {
    LOGIN = 'LOGIN',
    SIGNUP = 'SIGNUP',
}

export const Auth = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const auth = useContext(AuthContext);

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false,
        },
        password: {
            value: '',
            isValid: false,
        }
    }, false);

    const authSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isLoginMode) {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/login`, methodType.POST, {
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                })

                auth.login(responseData.userId, responseData.token);
            } catch (error) {
                console.log(error)
            }

        } else {
            try {
                const formData = new FormData();
                formData.append('email', formState.inputs.email.value);
                formData.append('name', formState.inputs.name.value);
                formData.append('password', formState.inputs.password.value);
                formData.append('image', formState.inputs.image.value);
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, methodType.POST, formData)

                auth.login(responseData.userId, responseData.token);
            } catch (error) {
                console.log(error)
            }
        }
    };

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined,
                image: undefined,
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false,
                },
                image: {
                    value: null,
                    isValid: false,
                }
            }, false)
        }

        setIsLoginMode(prevMode => !prevMode);
    };

    return <>
        <ErrorModal error={error} onClear={clearError} />
        <Card className='authentication'>
            {isLoading && <LoadingSpinner asOverlay/>}
            <h2> Login required </h2>
            <hr/>
            <form onSubmit={authSubmitHandler}>
                {!isLoginMode &&
                    <>
                        <Input
                            id='name'
                            element={elementType.INPUT}
                            type='text'
                            label='Your name'
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText='Please enter a name.'
                            onInput={inputHandler}
                        />
                        <ImageUpload
                            id='image'
                            onInput={inputHandler}
                            errorText='Please provide an image.'
                            isCentered={true}
                        />
                    </>
                }
                <Input
                    id='email'
                    element={elementType.INPUT}
                    type='email'
                    label='E-Mail'
                    validators={[VALIDATOR_EMAIL()]}
                    errorText='Please enter a valid email address.'
                    onInput={inputHandler}
                />
                <Input
                    id='password'
                    element={elementType.INPUT}
                    type='password'
                    label='Password'
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    errorText='Please enter a valid password, at least 6 characters.'
                    onInput={inputHandler}
                />
                <Button type='submit' disabled={!formState.isValid}>
                    {isLoginMode ? authMode.LOGIN : authMode.SIGNUP}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>
                SWITCH TO {!isLoginMode ? authMode.LOGIN : authMode.SIGNUP}
            </Button>
        </Card>
    </>
};
