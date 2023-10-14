import React from 'react';
import './Map.scss';

type Props = {
    className?: string;
    style?: unknown;
    center:  {
        lat: number,
        lng: number,
    },
    zoom: number;
};

export const Map = (props : Props) => {
    const { center, zoom, } = props;

    return <div className={`map ${props.className}`} style={props.style}>
        <p>Center: {center.lat}; {center.lng}  </p>
        <p>Zoom: {zoom} </p>
    </div>
};
