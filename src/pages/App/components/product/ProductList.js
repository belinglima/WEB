import React, { Component } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import api from '../../../../services/api'
import { withRouter } from 'react-router-dom'
import { Row, Col } from 'reactstrap';

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
                console.log(this.state.category)
            }       
  }

  async deleteProduct(productId) {
    const id = productId;

    const res = await api.delete(`/auth/product/${id}`);
    
    if(res) {
      const payload = await api.get('/auth/product')
      
      if(payload) {
          this.setState({
              products: payload.data,
              msg: 'deletado com sucesso!'
          })
      }       
    }
   
  }

  render() {
    const { error, products, category} = this.state;
  
    if(error) {
      return (
        <div>Error: {error}</div>
      )
    } else {
    
      return(
        
        <div>
      <Row>
        <Col sm="11">
        {this.state.msg !== '' && <Alert variant="success">{this.state.msg}</Alert>}
        {this.state.response.message && <Alert variant="success">{this.state.response.message}</Alert>}
        </Col>
      </Row>
      <Row>
        <Col sm="10"> <h3>Produtos</h3>  </Col>
        <Col sm="2"><Button onClick={() => this.props.history.push(`/AddProduct`)} variant="info">Novo</Button></Col>     
      </Row>
         <Table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Ativo</th>
                <th>Ações</th>
              </tr>
            </thead>
          
            <tbody>
              {products
              .map(product  => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  {category
                  .filter(category => category.id === product.category_id)
                  .map(category => (
                    <td key={category.id}>{category.title}</td>
                  ))}
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.active === 1 ? <span>Ativo</span> : <span>Inativo</span>}</td>
                  <td>
                    <Button variant="info" onClick={() => this.props.history.push(`/products/${product.id}`)}>Edit</Button>
                    &nbsp;<Button variant="danger" onClick={() => this.deleteProduct(product.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )
    }
  }
}

export default withRouter(ProductList);