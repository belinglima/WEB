import React, { Component } from 'react';
// import M from "materialize-css";


class RelatoryList extends Component{

  // componentDidMount() {
  //   M.Tabs.init(this.Tabs);
  // }

  render() {

    return(
      <div className="home">
        <div className="relatory">
            <h5>Relatórios</h5>
        </div>
        <div class="row">
          <div class="col s12">
                <ul
                  ref={Tabs => {
                    this.Tabs = Tabs;
                  }}
                  id="tabs-swipe-demo"
                  className="tabs tabs-fixed-width tab-demo z-depth-1 "
                >
                <li className="tab col s3">
                  <a href="#test-swipe-1">Vendas</a>
                </li>
                <li className="tab col s3">
                  <a href="#test-swipe-2">Avaliações</a>
                </li>
                <li className="tab col s3">
                  <a href="#test-swipe-3">Usuários</a>
                </li>
              </ul>

              <div id="test-swipe-1" className="home col s12">
                <div className="conteudo">
                    Total de Vendas 
                </div>
                <div className="gerar">
                  {/* Gerar Relatorio */}
                </div>
              </div>
              <div id="test-swipe-2" className="home col s12 ">
                <div className="conteudo">
                    Total de Avaliações
                </div>
                <div className="gerar">
                  {/* Gerar Relatorio */}
                </div>
              </div>
              <div id="test-swipe-3" className="home col s12 ">
                <div className="conteudo">
                    Total de Usuários
                </div>
                <div className="gerar">
                  {/* Gerar Relatorio */}
                </div>
              </div>

          </div>
        </div>







      </div>
    )
  }
}

export default RelatoryList