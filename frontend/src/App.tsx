import React, {Suspense} from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { MainNavigation } from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuthHook } from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import './App.scss';

const Users = React.lazy(() => import('./users/pages/Users').then(module => ({ default: module.Users })));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace').then(module => ({ default: module.NewPlace })));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces').then(module => ({ default: module.UserPlaces })));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace').then(module => ({ default: module.UpdatePlace })));
const Auth = React.lazy(() => import('./users/pages/Auth').then(module => ({ default: module.Auth })));

function App() {
    const { token, userId, login, logout } = useAuthHook();
    let routes:  React.ReactElement<string, string> = (<></>);

    if (token) {
        routes = (
            <Routes>
                <Route path='/' element={<Users/>}/>
                <Route path='/:userId/places' element={<UserPlaces/>}/>
                <Route path='/places/new' element={<NewPlace/>}/>
                <Route path='/places/:placeId' element={<UpdatePlace/>}/>
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
        )
    } else {
        routes = (
            <Routes>
                <Route path='/' element={<Users/>}/>
                <Route path='/:userId/places' element={<UserPlaces/>}/>
                <Route path='/auth' element={<Auth/>}/>
                <Route path='*' element={<Navigate to='/auth' replace />} />
            </Routes>
        )
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn: !!token, token, userId, login, logout }}>
            <Router>
                <MainNavigation/>
                    <Suspense fallback={
                        <div className='center' >
                            <LoadingSpinner asOverlay />
                        </div>}>
                            <main> {routes} </main>
                    </Suspense>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
