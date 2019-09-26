import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';
import api from '../../../../services/api'
import { withRouter } from 'react-router-dom'
import { Row, Col, ButtonGroup } from 'reactstrap';
import swal from 'sweetalert';

import logo from '../../../../assets/user.png'

const styles = {
  button: {
    background: '#C71585',
    width: '3rem', 
    height: '3rem' ,
    borderRadius: '25rem',
    border: '1px solid #C71585',
    margin: '0 0 0.5em'
  },
  card: {
    border: '1px solid #C71585',
    width: '10rem', 
    height: '10rem',
    margin: '0 0 0.5em',
  },
  btn: {
    border: '1px solid #C71585',
  },
  hr: {
    padding: '10px 0 0.10px'
  }
};



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
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.vay(productId)
      } else {
        swal("Produto Não será Deletado");
      }
    });
  }

  render() {
    const { error, products} = this.state;

    
  
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
        <Col sm="11"> <h3>Produtos</h3></Col>
        <Col sm="1">
            <Button onClick={() => this.props.history.push(`/AddProduct`)} className="button" 
                style={styles.button}
                ><b>+</b>
            </Button>
          </Col>     
      </Row>
      <Row>
        {products.map((product, i) => (
          <Col sm="2"  key={product.id}>
          <div className="card text-center" style={styles.card}>
          {product.name}
          <div className="card-body" style={styles.hr}>
                <img className="card-img-top" src={product.image[0] == null ? logo : product.images[0].url} style={{ width: '5rem', height: '5rem', borderRadius: '25rem', padding: '5px' }} alt={'Foto de  '+product.name} />
              <ButtonGroup aria-label="Basic example">
                <Button variant="btn  btn-sm" onClick={() => this.props.history.push(`/products/${product.id}`)} style={styles.btn}>Editar</Button>
                  &nbsp;
                <Button variant="btn  btn-sm" onClick={() => this.deleteProduct(product.id)} style={styles.btn}>Deletar</Button>
              </ButtonGroup>
          </div>
          </div>
          </Col>
        ))}
        </Row>
        
        {/* {products.map(product  => (
          () => this.deleteProduct(product.id)
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
        ))} */}

      </div>
      )
    }
  }
}

export default withRouter(ProductList);