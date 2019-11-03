import React from 'react'
import Sidebar from '../fixedComponents/sidebar';
import UserList from './UserList';

function User() {
    return(
        <div>
	        <Sidebar />
	        <UserList />
        </div>
    )
}

export default User
