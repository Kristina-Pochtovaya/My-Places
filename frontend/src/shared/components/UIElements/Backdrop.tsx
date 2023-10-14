import React from 'react';
import { createPortal } from 'react-dom';
import './Backdrop.scss';

type Props = {
  onClick: () => void;
};

const Backdrop = (props : Props) => {

  return createPortal(
    <div className='backdrop' onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
