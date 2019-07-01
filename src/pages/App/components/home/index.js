import React from 'react'
import { HomeContainer } from '../../styles';
import Sidebar from '../fixedComponents/sidebar';
import HomeChart from './HomeChart';

function Home() {
    return(
        <HomeContainer>
        <Sidebar />
            <HomeChart />
        </HomeContainer>
    )
}

export default Home