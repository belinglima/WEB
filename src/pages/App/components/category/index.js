import React from 'react'
import { CategoryContainer } from '../../styles';
import Sidebar from '../fixedComponents/sidebar';
import CategoryList from './CategoryList';

function Category() {
    return(
        <CategoryContainer>
            <Sidebar />
            <CategoryList />
        </CategoryContainer>    
    )
}

export default Category