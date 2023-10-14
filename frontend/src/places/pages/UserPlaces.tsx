import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { PlaceList } from '../components/PlaceList';
import { methodType, useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

export const UserPlaces = () => {
    const userId = useParams().userId;
    const [loadedUserPlaces, setLoadedUserPlaces] = useState([]);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const sendRequestLocal = async ()=>  {
            try {
                const responseData =  await sendRequest(`http://localhost:5000/api/places/user/${userId}`, methodType.GET)
                setLoadedUserPlaces(responseData?.places || []);
            } catch (error) {
                console.log(error);
            }
        }

        sendRequestLocal();
    }, [sendRequest, userId]);

    const placeDeletedHandler = (deletedPlaceId: string) => {
        setLoadedUserPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
    }

    return <>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && (
                <div className='center'>
                    <LoadingSpinner asOverlay />
                </div>
            )}
            {!isLoading && loadedUserPlaces && <PlaceList
                items={loadedUserPlaces}
                onDeletePlace={placeDeletedHandler}
            />}
        </>
};
