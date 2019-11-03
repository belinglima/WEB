import React from "react";
import {
  Link,
  withRouter
} from "react-router-dom";
import ReactTooltip from 'react-tooltip'

function Sidebar(props) {
  function handleLogout(){
    localStorage.clear()
    props.history.push('/')
  }

  return (
    <div>
      <ReactTooltip place="right" type="dark" effect="solid"/>

        <nav className="sidenav sidenav-fixed menu-left corPadrao darken-4">
          <ul>
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
                <Link to="#Sair" onClick={handleLogout} data-tip="Sair" data-place="right" data-effect="solid"><i className="large material-icons white-text">power_settings_new</i></Link>
            </li>
          </ul>
        </nav>

    </div>
  );
}

export default withRouter(Sidebar);
