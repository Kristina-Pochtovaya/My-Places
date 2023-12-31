import React from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { PropsWithChildren } from '../UIElements/Card';
import './SideDrawer.scss';

type Props = {
    show: boolean;
    onClick: () => void;
};

export const SideDrawer = (props: Props & PropsWithChildren<{}>) => {
    const content = (
        <CSSTransition
            in={props.show}
            timeout={200}
            classNames='slide-in-left'
            mountOnEnter
            unmountOnExit
        >
            <aside className='side-drawer' onClick={props.onClick}>
                {props.children}
            </aside>
        </CSSTransition>
    );

    return createPortal(content, document.getElementById('drawer-hook'));
};
