import React from 'react';
import { Row, Form, Col, Button, Alert } from 'react-bootstrap';
import api  from '../../../../services/api'
import { ProductContainer } from '../../styles';
import Sidebar from '../fixedComponents/sidebar'

class AddProduct extends React.Component {
    state = {
      name: '',
      price: '',
      description: '',
      active: '',
      category_id: '',
      category: [],
      msg: ''
    }
 
    async componentDidMount() {
      const response = await api.get('/auth/category')
      console.log(response.data)
      if(response) {
          this.setState({
              category: response.data
          })
      }   
    }

    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

  handleSubmit = async e => {
    e.preventDefault();
    await api.post('/auth/product',{
      name:this.state.name,
      price:this.state.price,
      description:this.state.description,
      active:this.state.active,
      category_id:this.state.category_id})
     if(api){
      this.setState({
        name:'',
        price:'',
        description:'',
        active:'',
        category_id:'',
        msg: 'Cadastrado com Sucesso!'
      })  
     }
  }

  render() {
    const { msg, category} = this.state;
    return(
      <ProductContainer>
      <Sidebar />
      <div>
      <Row>
      <Col sm="11">
      {msg !== '' && <Alert variant="success">{msg}</Alert>}
      </Col>
    </Row>
    <h3>Cadastro de Produto</h3>
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
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  placeholder="Descrição" />
              </Form.Group>
              <Form.Group>
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

export default AddProduct;
