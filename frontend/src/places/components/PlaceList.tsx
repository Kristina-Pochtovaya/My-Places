import React from 'react';
import { PlaceItem } from './PlaceItem';
import { Card } from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import './PlaceList.scss';

export interface Place {
    id: string;
    title: string
    image?: string;
    description: string;
    address: string;
    creator?: string;
    location?: {
        lat: number,
        lng: number,
    }
}

type Props = {
    items: Place[];
    onDeletePlace: (id: string) => void;
}

export const PlaceList = ({ items, onDeletePlace } : Props) => {
    return (
        items.length === 0
            ? <div className='place-list center'>
                <Card>
                    <h2>No places found. Maybe create one?</h2>
                    <Button to='/places/new'> Share Place</Button>
                </Card>
            </div>
            : <ul className='place-list'>
                {items.map(place => <PlaceItem
                    key={place.id}
                    id={place.id}
                    image={place.image}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorId={place.creator}
                    coordinates={place.location}
                    onDelete={onDeletePlace}
                />)}
            </ul>
    )
};
