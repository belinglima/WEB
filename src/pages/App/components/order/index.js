import React from 'react'
import { OrderContainer } from '../../styles';
import Sidebar from '../fixedComponents/sidebar';
import OrderList from './OrderList';

function Order() {
    return(
        <OrderContainer>
        <Sidebar />
            <OrderList />
        </OrderContainer>
    )
}

export default Order