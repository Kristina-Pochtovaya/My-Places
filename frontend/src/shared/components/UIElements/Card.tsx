import React, {ReactNode} from 'react';
import './Card.scss';

export type PropsWithChildren<P> = P & { children?: ReactNode };

export type CardProps = {
  style?: unknown;
  className?: string;
};

export const Card  = (props: PropsWithChildren<CardProps>)  => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

