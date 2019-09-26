import React, { Component } from 'react';
import {  Row, Form, Col, Button, Alert } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import api from '../../../../services/api'
import Sidebar from '../fixedComponents/sidebar';
import { ProductContainer } from '../../styles';

class ProductEdit extends Component {
    state = {
        error: null,
        msg: '',
        category: [],
       
        id: '',
        name: '',
        category_id: '',
        price: '',
        description: '',
        active: ''
    }   

    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }
    
    handleSubmit = async e => {
        e.preventDefault();
        const { id }  = this.props.match.params;
        await api.put(`/auth/product/${id}/`,
        {id:this.state.id,category_id:this.state.category_id,name:this.state.name,
            price:this.state.price,description:this.state.description,active:this.state.active});
          this.setState({
              msg: 'atualizado com sucesso!'
          })  
    }
  
  async componentDidMount() {
            const { id } = this.props.match.params;
            const response = await api.get(`/auth/product/${id}`);
            const res = await api.get('/auth/category')
            if(response) {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    category_id: response.data.category_id,
                    price: response.data.price,
                    description: response.data.description,
                    active: response.data.active,
                })
                this.setState({
                    category: res.data
                })
            }      
            console.log(this.state)
  }
 
  render() {
    const { error, category} = this.state;

    if(error) {
      return (
        <div>Error: <Alert variant="info">{error}</Alert></div>
      )
    } else {
      return(
        <ProductContainer>
        <Sidebar />
        <div>
        <Row>
        <Col sm="11">
        {this.state.msg !== '' && <Alert variant="success">{this.state.msg}</Alert>}
        </Col>
      </Row>
          <h3>Editar Produto</h3>
          <Row>
          <Col sm={11}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  required
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="Nome do Produto"/>
              </Form.Group>
        <Row>  
        <Col xs="4">
              <Form.Group controlId="category_id">
                <Form.Label>Categoria</Form.Label>
                <Form.Control as="select" name="category_id" onChange={this.handleChange}>
                <option>* Selecione Categoria</option>
                {  
                    category.map((el, index) => (    
                        <option key={el.id} value={el.id} onChange={this.handleChange}>{el.title}</option>
                     ))
                 }
                </Form.Control>
                </Form.Group>
        </Col>
        <Col xs="4">
              <Form.Group controlId="active">
                <Form.Label>Ativo ?</Form.Label>
                <Form.Control as="select" name="active" onChange={this.handleChange}>
                <option>* Selecione</option>
                <option value='1' onChange={this.handleChange}>Ativo</option>
                <option value='0' onChange={this.handleChange}>Inativo</option>
                </Form.Control>
              </Form.Group>
        </Col>
        <Col xs="4">
              <Form.Group controlId="price">
                <Form.Label>Preço do Produto R$</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  required
                  value={this.state.price}
                  onChange={this.handleChange}
                  placeholder="Preço R$ ..." />
              </Form.Group>
        </Col>
        </Row>    
              <Form.Group controlId="description">
                <Form.Label>description</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  placeholder="description" />
              </Form.Group>
              <Form.Group>
                <Form.Control type="hidden" name="id" value={this.state.id} />
                <Button variant="success" type="submit">Salvar</Button>&nbsp;&nbsp; 
                <Button onClick={this.props.history.goBack} variant="success">Voltar</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        </div>
        </ProductContainer>

      )
    }
  }
}

export default withRouter(ProductEdit);