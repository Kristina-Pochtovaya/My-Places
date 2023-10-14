import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { elementType, Input } from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../util/validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { methodType, useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { ImageUpload } from '../../shared/components/FormElements/ImageUpload';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import './PlaceForm.scss';

export enum actionType {
    INPUT_CHANGE = 'input_change',
    SET_DATE = 'set_data',
}

export const NewPlace = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const auth = useContext(AuthContext);

    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false,
        },
        description: {
            value: '',
            isValid: false,
        },
        address: {
            value: '',
            isValid: false,
        },
        image: {
            value: null,
            isValid: false,
        },
    }, false);

    const navigate = useNavigate();

    const placeSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('address', formState.inputs.address.value);
            formData.append('image', formState.inputs.image.value);

            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/places`,
                methodType.POST,
                formData,
                { Authorization: 'Bearer ' + auth.token }
            );

            navigate('/');
        } catch (error) {
            console.log(error)
        }
    };

    return <>
        <ErrorModal error={error} onClear={clearError}/>
        <form className='place-form' onSubmit={placeSubmitHandler}>
            {isLoading && (
                <div className='center'>
                    <LoadingSpinner asOverlay />
                </div>
            )}
            <Input
                id='title'
                element={elementType.INPUT}
                label='Title'
                type='text'
                errorText='Please enter a valid title.'
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
            />
            <Input
                id='description'
                element={elementType.TEXTAREA}
                label='Description'
                type='text'
                errorText='Please enter a valid description (at leasr 5 characters).'
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput={inputHandler}
            />
            <Input
                id='address'
                element={elementType.INPUT}
                label='Address'
                errorText='Please enter a valid address.'
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
            />
            <ImageUpload
                id='image'
                onInput={inputHandler}
                errorText='Please provide an image.'
                isCentered={true}
            />
            <Button type='submit' disabled={!formState.isValid}>
                ADD PLACE
            </Button>
        </form>
    </>
};
