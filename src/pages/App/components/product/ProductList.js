import React, { Component } from 'react';
import api from '../../../../services/api'
import { withRouter } from 'react-router-dom'
import swal from 'sweetalert';

class ProductList extends Component {
  state = {
      error: null,
      products: [],
      response: {},
      msg: '',
      category: []
  }

  async componentDidMount() {
    const category = await api.get(`/auth/category/`);
      const response = await api.get('/auth/product')
      console.log(response.data)
      if(response) {
          this.setState({
              products: response.data
          })
          this.setState({
            category: category.data
          })
      }       
  }

  async vay (productId){
    const id = productId;
    const res = await api.delete(`/auth/product/${id}`);
    if(res) {
      const payload = await api.get('/auth/product')
      if(payload) {
          this.setState({
              products: payload.data
          })
      }       
    }
  }

  deleteProduct(productId) {
    swal({
      title: "Você tem certeza?",
      text: "Seu Produto será deletado!",
      icon: "warning",
      buttons: true,
      buttons: ["Cancelar", "Deletar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.vay(productId)
        this.setState({
          msg: 'Produto deletado com sucesso.'
        })
      } 
    });
  }

  render() {
    const { error, products, category, msg} = this.state;

    const filtro = document.getElementById('search');
    const tabela = document.getElementById('datatable');
    if (filtro != null){
        filtro.onkeyup = function() {
        var nomeFiltro = filtro.value;
            for (var i = 1; i < tabela.rows.length; i++) {
                var conteudoCelula = tabela.rows[i].cells[0].innerText;
                var corresponde = conteudoCelula.indexOf(nomeFiltro) >= 0;
                tabela.rows[i].style.display = corresponde ? '' : 'none';
            }
        };
    }
  
    if(error) {
      return (
        <div>Error: {error}</div>
      )
    } else {
      return(
        <div className="home">
        <div className="row">

        {this.state.msg !== '' &&
          <div className="col s10 msg center ajuste"> 
            {this.state.msg}
          </div>
        }
          <div className="col s2 right">
            <a onClick={() => this.props.history.push(`/AddProduct`)} 
              className="btn-flat btn-medium corPadrao right ">
              <i className="material-icons white-text">add</i>
            </a>
          </div>
        </div>
        <div className="row">
          <div  className="col s12">
            <div className="card material-table">     
            <div className="dataTabless_filter">
              <label>Busca de Produtos:<input type="search" id="search" placeholder="" aria-controls="datatable" />
              </label>
            </div>
            <table id="datatable">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Ativo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
            {products.map((product) => (  
              <tr key={product.id}>
                <td>{product.name}</td>
                {category
                .filter(category => category.id === product.category_id)
                .map(category => (
                  <td key={category.id}>{category.title}</td>
                ))}
                <td>{product.description}</td>
                <td>{(product.price).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</td>
                <td>{product.active === 1 ? 'Ativo' : 'Inativo'}</td>
                <td>
                  <a onClick={() => this.props.history.push(`/products/${product.id}`)}>
                    <div className="btn-flat corPadrao darken-4">
                        <i className="material-icons white-text">edit</i>
                    </div>
                  </a>
                  &nbsp;
                  <a  onClick={() => this.deleteProduct(product.id, product.name)}>
                      <div className="btn-flat corPadrao darken-4">
                        <i className="material-icons white-text">delete</i>
                      </div>
                  </a>
                </td>
              </tr>
            ))}
           </tbody>
          </table>
        </div>
      </div>
    </div>


      </div>
      )
    }
  }
}

export default withRouter(ProductList);