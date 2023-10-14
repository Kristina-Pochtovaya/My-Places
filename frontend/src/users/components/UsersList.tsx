import React from 'react';
import { UserItem } from './UserItem';
import { Card } from '../../shared/components/UIElements/Card';
import { Place } from '../../places/components/PlaceList';
import './UsersList.scss';

export interface User {
    id: string;
    name: string
    image: string;
    places: Place[];
}

type Props = {
    items: User[];
}

export const UsersList = ({ items }: Props) => {
    return (
        items.length === 0
            ? <div className='center'>
                <Card>
                    <h2>No users found.</h2>
                </Card>
            </div>
            : <ul className='users-list'>
                {items.map(user => <UserItem
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    image={user.image}
                    placeCount={user.places.length}
                />)}
            </ul>
    )
};
