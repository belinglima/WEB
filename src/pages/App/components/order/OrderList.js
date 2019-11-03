import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import api from '../../../../services/api'
import swal from 'sweetalert';

class OrderList extends Component{

  state = {
    orders: [],
    users: [],
    contagem: '',
    detalha: [],
    cancela: '',
    vay: '',
    msg: '',
    n: '',
    ligado: false
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  async componentDidMount() {
    const respo = await api.get('/auth/status/1')
    const res = await api.get('/auth/user')
    const conta = await api.get('/auth/contagem')
    const response = await api.get('/auth/order')
    if(response) {
      this.setState({ contagem: conta.data.contagem })
      this.setState({ orders: response.data })
      this.setState({ users: res.data })
    }
    
    if (respo.data['status'] === 1){
        this.setState({ ligado: true })
    } else {
        this.setState({ ligado: false })
    }
  }

  async detalhaProduto(order_id) {
    const response = await api.get(`/auth/order/${order_id}`);
      if(response) {
        this.setState({
          detalha: response.data
        })
      }
  }

  EntregaOOrder(orderId) {
    swal({
      title: "Você tem certeza?",
      text: "O Pedido será Entregue, Ja esta pronto?",
      icon: "warning",
      buttons: true,
      buttons: ["Cancelar", "Entregar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.entrega(orderId)
        this.setState({
          msg: 'Pedido Saiu para Entrega!',
          n: orderId
        })

        setTimeout(
          function() {
              this.setState({msg: '', n: ''});
          }
          .bind(this),
          10000
        );
      } 
    });
  }

  async entrega(orderId) {
    const id = orderId;
    const entrega = await api.post(`/auth/order/${id}`,{
      status: "DELIVERED"
    })

    if(entrega) {
      const payload = await api.get('/auth/order')
      const pay = await api.get('/auth/contagem')
      if(payload) {
        this.setState({
            orders: payload.data,
            contagem: pay.data.contagem
        })
      }       
    }
  }

  Parametros(valor) {
    // document.getElementById('campo').value = valor;
    this.setState({
      cancela: valor
    })
  }

    async CancelaOrder (){
        const ids = this.state.cancela
        const cancela = await api.post(`/auth/order/${ids}`,{
          motivo: this.state.motivo,
          status: "CANCELED"
        })

        this.setState({
          vay: 'Pedido Cancelado!'
        })

        if(cancela) {
          const payload = await api.get('/auth/order')
          if(payload) {
            this.setState({
                orders: payload.data
            })  
        }

        setTimeout(
          function() {
              this.setState({vay: ''});
              window.location.reload()
          }
          .bind(this),
          2000
        );
      }
 }

 
  render() {
    const { users, orders, detalha } = this.state;

    return(
      <div className="home">
      <ReactTooltip />
        <div className="col s12"><h3>Central de pedidos</h3></div>
        <div className="col s6 left">
          <table className="highlight">
         
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Forma Pagamento</th>
                <th>Total R$</th>
                <th>Troco R$</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
            {orders.map( (order) => (
            order.status === 'PENDING' ?
            
            <tr key={order.id}>
                <td>{order.id}</td>
                  {users
                  .filter(users => users.id === order.user_id)
                  .map(users => (
                    <td key={users.id}>{users.name}</td>
                  ))}
                <td>{order.forma}</td>
                <td>R$ 00,00</td>
                {/* {order.product === undefined ? '' : (order.total).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})} */}
                <td>{(order.change).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</td>
                <td><ReactTooltip />
                    <a 
                      onClick={() => this.detalhaProduto(order.id)} 
                      rel="modal:open" className="modal-trigger" href="#detalha" 
                      data-id={order.id} 
                      data-tip="Detalhes" 
                      data-place="left" 
                      data-effect="solid"
                    >
                    <div className="btn-flat corPadrao darken-4">
                      <i className="material-icons white-text">more</i>
                    </div>
                  </a>
                  &nbsp;
                  <a 
                      onClick={() => this.EntregaOOrder(order.id)}  
                      data-tip="Entregar" 
                      data-place="bottom" 
                      data-effect="solid"
                  >
                    <div className="btn-flat corPadrao darken-4">
                      <i className="material-icons white-text">send</i>
                    </div>
                  </a>
                  &nbsp;
                  &nbsp;
                  <a 
                    onClick={() => this.Parametros(order.id)}
                    rel="modal:open" href="#cancela" 
                    data-id={order.id} 
                    data-tip="Cancelar Pedido" 
                    data-place="right" 
                    data-effect="solid"
                  >
                    <div className="btn-flat corPadrao darken-4">
                      <i className="material-icons white-text">cancel</i>
                    </div>
                </a>
              </td>
            </tr>
            : '' 
          ))}
            
            </tbody>
          </table>
        </div>
        <div className="col s6 right">
         
          <div className="card ajuste">
            <p>Pedidos Aguardando Entrega!</p> 
            <br />
            <p className="bolinha">{this.state.contagem === '' ? '' : this.state.contagem}</p>
            <br />
            <p>{this.state.msg === '' ? '' : this.state.msg + ' - Nº: '} {this.state.n}</p>
          </div>
        </div>


        {/* detalhamento de pedido */}
        <div className="modal tamanho" id="detalha">
          <div>
              <p>Detalhes do Pedido</p>
          </div>
          <div>
            <div className="tabelinha">
            <table className="striped">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Vlr Unit.</th>
                </tr>
              </thead>
              <tbody>
                {this.state.detalha == '' ? '' : 
                  detalha.product.map(d => (
                    <tr key={d.id}>
                      <td>{d.name}</td>
                      <td>0{d.pivot.qtd}</td>
                      <td>{d.price}</td>
                    </tr>
                  ))
                }                
              </tbody>
            </table>
          </div>

          <div className="total">
              <div className="left">
                observações:
                {this.state.detalha == '' ? '' : 
                  detalha.product.map(d => (
                      <p key={d.id}>{d.pivot.obs}</p>
                  ))
                }      
              </div>
              <br />
              <br />
          </div>          
          <br />
          <div className="total">
              <div className="valor right">
                Total: R$ 00,00
              </div>
          </div>
          </div>
        </div>

        {/* cancelmento de pedido */}
        <div className="modal tamanho" id="cancela">
        <input id="campo" name="cancela" type="hidden" value="" />
          <div>
              <p>Cancelar Pedido Nº 0{this.state.cancela}</p>
              
              <div className="input-field col s12">
                <i className="material-icons prefix">cancel</i>
                  <textarea className="validate" 
                    name="motivo"
                    value={this.state.motivo}
                    onChange={this.handleChange}
                    required
                  />
                <p className="active">Motivo do Cancelamento</p>
                <br />
                <p className="cancela right">{this.state.vay === '' ? '' : this.state.vay}</p>
                <br />
                <a onClick={() => this.CancelaOrder()}
                  className="right" data-tip="Cancelar Agora" data-place="right" data-effect="solid">
                  <div className="btn-flat corPadrao darken-4">
                    <i className="material-icons white-text">cancel</i>
                  </div>
                </a>
              </div>
          </div>
        </div>

      </div>
    )
  }
}

export default OrderList