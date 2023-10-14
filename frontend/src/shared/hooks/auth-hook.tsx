import { useCallback, useEffect, useState } from 'react';

const USER_DATA = 'userData';
let logoutTimer: NodeJS.Timeout;

export const useAuthHook = () => {
    const [token, setToken] = useState(null);
    const [tokenExpirationDate, setTokenExpirationDate] = useState<Date>();
    const [userId, setUserId] = useState(null);

    const login = useCallback((uid: string, token: string, expirationDate: Date = null) => {
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(tokenExpirationDate);
        setToken(token);
        setUserId(uid);
        localStorage.setItem(USER_DATA, JSON.stringify({ userId: uid, token, expiration: tokenExpirationDate.toISOString() }));
    }, []);

    const logout = useCallback(() => {
        setTokenExpirationDate(null);
        setToken(null);
        setUserId(null);
        localStorage.removeItem(USER_DATA);
    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem(USER_DATA));

        if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
            login(storedData.userId, storedData.token, new Date(storedData.expiration))
        }
    }, [login]);

    return { token, userId, login, logout }
};