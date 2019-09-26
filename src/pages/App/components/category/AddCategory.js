import React, { Component } from 'react';
import { Row, Form, Col, Button, Alert } from 'react-bootstrap';
import api  from '../../../../services/api'
import { CategoryContainer } from '../../styles';
import Sidebar from '../fixedComponents/sidebar'

class AddCategory extends Component {
    state = {
      title: '',
      description: '',
      active: '',
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
    await api.post('/auth/category',{
      title:this.state.title,
      description:this.state.description,
      active:this.state.active
    })
    if (api) {
        this.setState({
            title:'',
            description:'',
            active:'',
            msg: 'Cadastrada com Sucesso!'
        })  
    }
      
  }

  render() {
    return(
      <CategoryContainer>
      <Sidebar />
      <div>
      <Row>
      <Col sm="11">
      {this.state.msg !== '' && <Alert variant="success">{this.state.msg}</Alert>}
      </Col>
    </Row>
    <h3>Cadastro de Produto</h3>
    <Row>
    <Col sm={11}>
    <Form onSubmit={this.handleSubmit}>
        <Row>  
            <Col xs="4">

                <Form.Group controlId="title">
                    <Form.Label>Nome da Categoria</Form.Label>
                    <Form.Control
                    type="text"
                    name="title"
                    required
                    value={this.state.title}
                    onChange={this.handleChange}
                    placeholder="Nome da Categoria"/>
                </Form.Group>
            </Col>
        </Row> 
        <Row>  
        <Col xs="4">
        <Form.Label>Ativa ?</Form.Label>
                <Form.Control as="select" name="active" onChange={this.handleChange}>
                <option onChange={this.handleChange} value="1">Ativa</option>
                <option onChange={this.handleChange} value="0">Inativa</option>
                </Form.Control>
        </Col>
        </Row>    
        <Row>  
            <Col xs="4">
              <Form.Group controlId="description">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  placeholder="Descrição da Categoria" />
              </Form.Group>
            </Col>
        </Row>
              <Form.Group>
                <Button variant="success" type="submit">Salvar</Button>&nbsp;&nbsp;
                <Button onClick={this.props.history.goBack} variant="success">Voltar</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
      </CategoryContainer>
    )
  }
}

export default AddCategory;
