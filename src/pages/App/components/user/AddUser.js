import React, { Component } from 'react';
import { Row, Form, Col, Button, Alert } from 'react-bootstrap';
import api  from '../../../../services/api'
import { UserContainer } from '../../styles';
import Sidebar from '../fixedComponents/sidebar'
import MaskedInput from 'react-text-mask';

class AddUser extends Component {
    state = {
      name: '',
      cpf: '',
      email: '',
      password: '',
      telephone: '',
      address: '',
      number: '',
      neighborhood: '',
      reference: '',
      msg: ''
    }
 
    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

  handleSubmit = async e => {
    e.preventDefault();
    await api.post('/auth/user',{
            name:this.state.name,
            cpf:this.state.cpf,
            email:this.state.email,
            password:this.state.password,
            telephone:this.state.telephone,
            address:this.state.address,
            number:this.state.number,
            neighborhood:this.state.neighborhood,
            reference:this.state.reference
        })
            if(api){
                this.setState({
                    name:'',
                    cpf:'',
                    email:'',
                    password:'',
                    telephone:'',
                    address:'',
                    number:'',
                    neighborhood:'',
                    reference:'',
                    msg: 'Usuário cadastrado com sucesso!'
                })
            }
    }   

  render() {
    const { msg } = this.state;
    return(
      <UserContainer>
      <Sidebar />
      <div>
      <Row>
      <Col sm="11">
      {msg !== '' && <Alert variant="success">{msg}</Alert>}
      </Col>
    </Row>
    <Row>
    <Col sm={11}>
    <h3>Cadastro de Usuário</h3>
    <Form onSubmit={this.handleSubmit}>
        <Row>
            <Col xs="3">
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
            </Col>
            <Col xs="3">
                <Form.Group controlId="cpf">
                    <Form.Label>CPF</Form.Label>
                    <MaskedInput
                        type="text"
                        name="cpf"
                        className="form-control"
                        mask={[ /[0-9]/, /\d/, /\d/, '.' ,/\d/, /\d/, /\d/, '.' ,/\d/, /\d/, /\d/, '-' ,/\d/, /\d/]}
                        onBlur={() => {}}
                        guide={true}
                        required
                        value={this.state.cpf}
                        onChange={this.handleChange}
                        placeholder="CPF ex: 000.000.000-00"
                    />
                </Form.Group>
            </Col>
            <Col xs="3">
                <Form.Group controlId="email">
                    <Form.Label>E-Mail</Form.Label>
                    <Form.Control
                    type="text"
                    name="email"
                    required
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder="E-Mail ex: email@email.com"/>
                </Form.Group>
            </Col>
            <Col xs="3">
                <Form.Group controlId="password">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                    type="password"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Senha ex: 123456"/>
                </Form.Group>
            </Col>
        </Row>    
        <Row>  
        <Col xs="4">
                <Form.Group controlId="telephone">
                    <Form.Label>Telefone:</Form.Label>
                <MaskedInput
                    type="text"
                    className="form-control"
                    name="telephone"
                    mask={['(', /[0-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    required
                    value={this.state.telephone}
                    onChange={this.handleChange}
                    placeholder="Numero de Telefone ex: 53 99999.9999"
                    guide={true}
                />
                </Form.Group>
            </Col>
            <Col xs="6">
                <Form.Group controlId="address">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                    type="text"
                    name="address"
                    required
                    value={this.state.address}
                    onChange={this.handleChange}
                    placeholder="Endereço - ex: Av. Bento Gonçalves"/>
                </Form.Group>
            </Col>
            <Col xs="2">
                <Form.Group controlId="number">
                    <Form.Label>Numero</Form.Label>
                    <Form.Control
                    type="number"
                    name="number"
                    required
                    value={this.state.number}
                    onChange={this.handleChange}
                    placeholder="Numero da Residência - ex: 521"/>
                </Form.Group>
            </Col>
        </Row>    
        <Row>  
        <Col xs="6">
                <Form.Group controlId="neighborhood">
                    <Form.Label>Bairro</Form.Label>
                    <Form.Control
                    type="text"
                    name="neighborhood"
                    required
                    value={this.state.neighborhood}
                    onChange={this.handleChange}
                    placeholder="Nome do Bairro"/>
                </Form.Group>
            </Col>
            <Col xs="6">
                <Form.Group controlId="reference">
                    <Form.Label>Referência</Form.Label>
                    <Form.Control 
                    name="reference"
                    required
                    value={this.state.reference}
                    onChange={this.handleChange}
                    placeholder="Referência de Entrega. - ex: Rua ao lado do krolow"
                    as="textarea" rows="2" />
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
      </UserContainer>
    )
  }
}

export default AddUser;
