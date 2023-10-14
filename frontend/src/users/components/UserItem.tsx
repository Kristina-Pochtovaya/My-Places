import React from 'react';
import './UserItem.scss';
import { User } from './UsersList';
import { Avatar } from '../../shared/components/UIElements/Avatar';
import { Link } from 'react-router-dom';
import { Card } from '../../shared/components/UIElements/Card';

export type placeCounter = {
    placeCount: number;
};

export const UserItem = ({ id, name, image, placeCount }: Omit<User, 'places'> & placeCounter) => {
    return <li className='user-item'>
            <Card className='user-item__content'>
                <Link to={`/${id}/places`}>
                    <div className='user-item__image'>
                        <Avatar src={`${process.env.REACT_APP_ASSET_URL}/${image}`} alt={name}/>
                    </div>
                    <div className='user-item__info'>
                    <h2>{name}</h2>
                        <h3>{placeCount} {placeCount === 1 ? 'Place' : 'Places'}</h3>
                    </div>
                </Link>
            </Card>
    </li>
};
