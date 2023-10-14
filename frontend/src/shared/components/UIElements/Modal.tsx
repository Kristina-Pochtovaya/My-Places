import React from 'react';
import { createPortal } from 'react-dom';
import { PropsWithChildren } from './Card';
import Backdrop from './Backdrop';
import './Modal.scss';
import {CSSTransition} from "react-transition-group";

type ModalOverlayProps = {
    className?: string;
    headerClass?: string;
    contentClass?: string;
    footerClass?: string;
    style?: unknown;
    header: string;
    footer: JSX.Element;
    onSubmit?: () => void;
};

type ModalProps = {
    show: boolean;
    onCancel: () => void;
};

const ModalOverlay = (props: ModalOverlayProps & PropsWithChildren<{}>) => {
    const content = (
        <div className={`modal ${props.className}`} style={props.style}>
            <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>
            <form onSubmit={props.onSubmit ? props.onSubmit : event => event.preventDefault()}>
                <div className={`modal__content ${props.contentClass}`}>
                    {props.children}
                </div>
                <footer className={`modal__footer ${props.footerClass}`}>
                    {props.footer}
                </footer>
            </form>
        </div>
    );
    return createPortal(content, document.getElementById('modal-hook'));
};

export const Modal = (props: ModalProps & ModalOverlayProps & PropsWithChildren<{}>) => {
    return <>
        {props.show && <Backdrop onClick={props.onCancel}></Backdrop>}
        <CSSTransition
            in={props.show}
            timeout={200}
            mountOnEnter
            unmountOnExit
            classNames='modal'
        >
            <ModalOverlay {...props} />
        </CSSTransition>
    </>
};
