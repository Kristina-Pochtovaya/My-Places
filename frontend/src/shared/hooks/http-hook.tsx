import { useCallback, useState, useRef, useEffect } from 'react';
import axios from 'axios';

export enum methodType {
    GET = 'get',
    POST = 'post',
    PATCH = 'patch',
    DELETE = 'delete',
}

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    let activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url: string, method = methodType.GET, body: unknown = null, headers: any = {}) => {
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);

        try {
            let responseData;
            if (method === methodType.DELETE) {
                const response = await axios.delete(url, {headers: headers})
                responseData = await response.data;
            } else {
                const response = await axios[method](url, body, {headers: headers, signal: httpAbortCtrl.signal});
                responseData = await response.data;
            }

            setIsLoading(false);

            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl);

            return responseData;
        } catch (error) {
            const customErrorMessage = error.request.responseText ? JSON.parse(error.request.responseText).message : null;
            setError(customErrorMessage || error.message || 'Something went wrong, please try again.');
            setIsLoading(false);
            throw error;
        }
    }, []);

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
        }
    }, []);

    return {isLoading, error, sendRequest, clearError};
};