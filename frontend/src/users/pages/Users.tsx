import React, { useEffect, useState } from 'react';
import { UsersList } from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { methodType, useHttpClient } from '../../shared/hooks/http-hook';

export const Users = () => {
    const [loadedUsers, setLoadedUsers] = useState();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
            const sendRequestLocal = async ()=>  {
                try {
                const responseData =  await sendRequest('http://localhost:5000/api/users', methodType.GET)
                setLoadedUsers(responseData?.users || []);
                } catch (error) {
                    console.log(error);
                }
            }

            sendRequestLocal();

    }, [sendRequest]);

    return <>
        <ErrorModal error={error} onClear={clearError}/>
        {isLoading && (
            <div className='center'>
                <LoadingSpinner asOverlay />
            </div>
        )}
        {!isLoading && loadedUsers && <UsersList items={loadedUsers}/>}
        </>
};
