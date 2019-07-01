import React from 'react'
import { RelatoryContainer } from '../../styles';
import Sidebar from '../fixedComponents/sidebar';
import RelatoryList from './RelatoryList';

function Relatory() {
    return(
        <RelatoryContainer>
        <Sidebar />
            <RelatoryList />
        </RelatoryContainer>
    )
}

export default Relatory
