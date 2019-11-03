import React from 'react'
import Sidebar from '../fixedComponents/sidebar';
import OrderList from './OrderList';

function Order() {
    return(
        <div>
        <Sidebar />
            <OrderList />
        </div>
    )
}

export default Order