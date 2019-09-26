import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { withRouter, Link } from 'react-router-dom'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import ReactTooltip from 'react-tooltip'

const headerStyles = {
    padding: 5,
    background: '#C71585',
    zIndex: '0'
};

function Sidebar(props) {

    function handleLogout(){
        localStorage.clear()
        console.log(localStorage);
        props.history.push('/')
    }

    const data = [
        { key: '21' ,name: 'home', icon: 'home', route: '/home', defaultName: 'Homeee' },
        { key: '31' ,name: 'user', icon: 'users', route: '/user', defaultName: 'Usuário' },
        { key: '41' ,name: 'category', icon: 'tags', route: '/category', defaultName: 'Categoria' },
        { key: '51' ,name: 'products', icon: 'list-alt', route: '/products', defaultName: 'Produtos' },
        { key: '61' ,name: 'orders', icon: 'shopping-cart', route: '/orders', defaultName: 'Pedidos' },
        { key: '71' ,name: 'relatory', icon: 'copy', route: '/relatory', defaultName: 'Relatorios' },

    ]
    return(
    <>
    <ReactTooltip place="right" type="dark" effect="solid"/>
      <SideNav style={headerStyles} >
        <SideNav.Toggle />
        <SideNav.Nav>
        {  
            data.map((el, index) => (    
                    <NavItem key={`${el.key}`} eventKey={`${el.name}`} data-tip={el.defaultName} >
                            <NavIcon>
                                <Link to={`${el.route}`}> 
                                    <i className={`fa fa-fw fa-${el.icon}`} style={{ fontSize: '1.75em' }} />
                                </Link>
                            </NavIcon>
                            <NavText> 
                                 <Link to={`${el.route}`} >  
                                    {el.defaultName}
                                </Link>
                            </NavText>
                    </NavItem>    
            ))
        }
                     <NavItem data-tip="Logout" data-place="right">
                            <NavIcon>
                                <Link to=""> 
                                    <i className="fa fa-fw fa-power-off" style={{ fontSize: '1.75em' }} />
                                </Link>
                            </NavIcon>
                            <NavText> 
                                 <Link to="#" onClick={handleLogout}>Logout</Link>
                            </NavText>
                    </NavItem>    
        </SideNav.Nav>
    </SideNav>      
    </>
    )
}
 
export default withRouter(Sidebar);
