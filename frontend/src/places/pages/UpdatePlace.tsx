import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { elementType, Input } from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { Card } from '../../shared/components/UIElements/Card';
import  { methodType, useHttpClient } from '../../shared/hooks/http-hook';
import { Place } from '../components/PlaceList';
import { AuthContext } from '../../shared/context/auth-context';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../util/validators';
import './PlaceForm.scss';

export const UpdatePlace = () => {
    const auth = useContext(AuthContext);
    const userId = auth.userId;
    const [identifiedPlace, setIdentifiedPlace] = useState<Place>(null);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const placeId = useParams().placeId;
    const navigate = useNavigate();

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false,
        },
    }, true);

    useEffect(() => {
        const sendRequestLocal = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`, methodType.GET)
                setIdentifiedPlace(responseData?.place);


                setFormData({
                    title: {
                        value: responseData?.place.title,
                        isValid: true
                    },
                    description: {
                        value: responseData?.place.description,
                        isValid: true,
                    }
                }, true);
            } catch (error) {
                console.log(error);
            }
        }

        sendRequestLocal();
    }, [sendRequest, placeId, setFormData]);

    const placeUpdateSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`, methodType.PATCH, {
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
            },{ Authorization: 'Bearer ' + auth.token })

            navigate('/' + userId + '/places');
        } catch (error) {
            console.log(error)
        }
    };

    if (!identifiedPlace && !error) {
        return <div className='center'>
            <Card>
                <h2>Could not find place!</h2>
            </Card>
        </div>
    }

    if (isLoading) {
        return <div className='center'>
            <LoadingSpinner asOverlay/>
        </div>
    }

    return <>
        <ErrorModal error={error} onClear={clearError}/>
        {!isLoading && identifiedPlace && <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
            <Input
                id='title'
                element={elementType.INPUT}
                type='text'
                label='Title'
                validators={[VALIDATOR_REQUIRE()]}
                errorText={'Please enter a valid title.'}
                onInput={inputHandler}
                initialValue={identifiedPlace.title}
                initialValid={true}
            />
            <Input
                id='description'
                element={elementType.TEXTAREA}
                label='Description'
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText={'Please enter a valid description (min. 5 characters).'}
                onInput={inputHandler}
                initialValue={identifiedPlace.description}
                initialValid={true}
            />
            <Button type='submit' disabled={!formState.isValid}>
                UPDATE PLACE
            </Button>
        </form>}
    </>
};
