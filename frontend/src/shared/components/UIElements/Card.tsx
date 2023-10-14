import React, {ReactNode} from 'react';
import './Card.scss';

export type PropsWithChildren<P> = P & { children?: ReactNode };

export type Card = {
  style?: unknown;
  className?: string;
};

export const Card  = (props: PropsWithChildren<Card>)  => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

