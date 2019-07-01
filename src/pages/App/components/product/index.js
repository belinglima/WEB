import React from 'react'
import { ProductContainer } from '../../styles';
import Sidebar from '../fixedComponents/sidebar';
import ProductList from './ProductList';

function Product() {
    return(
        <ProductContainer>
            <Sidebar />
            <ProductList />
        </ProductContainer>
    )
}

export default Product