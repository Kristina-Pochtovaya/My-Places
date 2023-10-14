import React from 'react';
import { PropsWithChildren } from '../UIElements/Card';
import './MainHeader.scss';

export const MainHeader = (props: PropsWithChildren<{}>) => {
    return <header className='main-header'>
        {props.children}
    </header>
};
