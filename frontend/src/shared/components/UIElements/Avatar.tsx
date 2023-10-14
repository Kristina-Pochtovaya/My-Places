import React from 'react';
import './Avatar.scss';

export type AvatarProps = {
    src: string
    alt: string
    width?: number
    height?: number;
    style?: unknown;
    className?: string;
};

export const Avatar = (props: AvatarProps) => {
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={props.src}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};
