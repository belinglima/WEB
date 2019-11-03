import React, {Component} from 'react'
import Sidebar from './components/fixedComponents/sidebar';
import Header from './components/fixedComponents/header';
import HomeChart from './components/home'
import Outro from './components/home/outro';
import api from '../../../src/services/api'
import MaisUm from './components/home/maisUm';

class App extends Component {

  state = {
    users: [],
    list: []
  }

  async componentDidMount() {
    const res = await api.get('/auth/user')
    const response = await api.get('/auth/mais')
    if(res) {
      this.setState({ users: res.data, list: response.data })
    }
    console.log(this.state.list)
  }

  render() {
    var data = new Date();
    var meses = new Array(
    'janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro',
    'Outubro', 'Novembro', 'Dezembro'
    );

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="home">
        Selecione as opções do menu para continuar.
      </div>
      <div className="container grafico">
        <div className="row">
          <div className="col s4">
            <div className="card-panel graficos">
              <p>*Contagem Anual, Usuários por Mês.</p>
              <hr /><hr />
              <HomeChart />
              
            </div>
            <div className="card-panel graficos">
              <p>Numero de Pedidos por mês</p>
              <hr /><hr />
              <MaisUm />
              
            </div>
          </div>
          <div className="col s4">
            <div className="card-panel barras">
              <Outro />
            </div>
          </div>
          <div className="col s4">
            <div className="card-panel barras">
                <div className="liii">
                 Os 15 usuários que mais compraram no mês de {meses[data.getMonth()]}
                </div>  
                <div className="total usuariosVenda">
                  {this.state.list ?
                    this.state.list.map((u) => (
                      <p key={u.id} className="lii">{u.name}</p>
                    ))
                    : 'Não existem vendas ainda'}  
                </div>            
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}}

export default App



