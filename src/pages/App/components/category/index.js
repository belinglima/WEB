import React from 'react'
import Sidebar from '../fixedComponents/sidebar';
import CategoryList from './CategoryList';

function Category() {
    return(
        <div>
            <Sidebar />
            <CategoryList />
        </div>    
    )
}

export default Category