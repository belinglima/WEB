import React, { Component } from 'react';
import api from '../../../../services/api'
import {
  Link,
  withRouter
} from "react-router-dom";
import ReactTooltip from 'react-tooltip'

class Header extends Component {
    state = {
        status: ''
    }

    async componentDidMount() {
        const response = await api.get('/auth/status/1')
        if (response.data['status'] === 1){
            this.setState({ status: 1 })
        } else {
            this.setState({ status: 0 })
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        const response = await api.get('/auth/status/1')
       if (response.data['status'] === 1) {
        await api.put(`/auth/abrefecha/1`,{
            status: 0})
        window.location.reload()
       } else {
        await api.put(`/auth/abrefecha/1`,{
            status: 1})
        window.location.reload()
       }
    }

    render() {
    return (
     <div>   
        <div className="topo">
        <ReactTooltip place="right" type="dark" effect="solid"/>
        <p className="welcome">Seja bem-vindo: { localStorage.getItem('nome') }</p>
            <div className="statuss">
                {this.state.status === 1 ?
                    <div>
                        <div className="online"></div>
                        <div className="ononline">Online</div>
                    </div>
                    : 
                    <div>
                        <div className="offline"></div>
                        <div className="offonline">Closed</div>
                    </div> 
                }
            </div>       

            <div className="menuTopo right">
                <Link to="#ativar" onClick={this.handleSubmit} 
                    data-tip={this.state.status === 1 ? 'Fechar Sistema' : 'Ativar Sistema'} 
                    data-place="bottom" data-effect="solid">
                        <i className="tail material-icons white-text">settings_backup_restore</i>
                </Link>
            </div>
        </div>
        <div className="hamburguer">
            <nav className="no-shadow">
                <div className="nav-wrapper white">
                <ul className="left show-on-small-only">
                    <Link to="" href="#" data-target="slide-out" className="sidenav-trigger">
                    <i className="material-icons black-text">menu</i>
                    </Link>
                </ul>
                <ul className="right"></ul>
                </div>
            </nav>
            <ul id="slide-out" className="sidenav sidenav-fixed menu-left corPadrao darken-4 slide-out">
                <li>
                <Link to="/app" data-tip="Pagina Inicial" data-place="right" data-effect="solid"><i className="large material-icons white-text">home</i></Link>
                </li>
                <li>
                <Link to="/user" data-tip="Usuários do Sistema" data-place="right" data-effect="solid"><i className="large material-icons white-text">people</i></Link>
                </li>
                <li>
                <Link to="/category" data-tip="Categorias de Produtos" data-place="right" data-effect="solid"><i className="large material-icons white-text">bookmarks</i></Link>
                </li>
                <li>
                    <Link to="/products" data-tip="Produtos" data-place="right" data-effect="solid"><i className="large material-icons white-text">fastfood</i></Link>
                </li>
                <li>
                    <Link to="/orders" data-tip="Central de Pedidos" data-place="right" data-effect="solid"><i className="large material-icons white-text">grid_on</i></Link>
                </li>
                <li>
                    <Link to="/relatory" data-tip="Relatórios" data-place="right" data-effect="solid"><i className="large material-icons white-text">equalizer</i></Link>
                </li>
                <li className="logout">
                    <Link to="#Sair"  data-tip="Sair" data-place="right" data-effect="solid"><i className="large material-icons white-text">power_settings_new</i></Link>
                </li>
            </ul>
        </div>
    </div>
    );
   }
}
export default withRouter(Header);
