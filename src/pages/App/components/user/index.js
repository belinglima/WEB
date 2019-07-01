import React from 'react'
import { UserContainer } from '../../styles';
import Sidebar from '../fixedComponents/sidebar';
import UserList from './UserList';

function User() {
    return(
            <UserContainer>
            <Sidebar />
            <UserList />
            </UserContainer>
    )
}

export default User
