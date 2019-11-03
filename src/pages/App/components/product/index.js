import React from 'react'
import Sidebar from '../fixedComponents/sidebar';
import ProductList from './ProductList';

function Product() {
    return(
        <div>
            <Sidebar />
            <ProductList />
        </div>
    )
}

export default Product