import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { CardDeck, Card } from 'react-bootstrap';
import Logo from "../../assets/logo.png";

import api from "../../services/api";
import apiCep from '../../services/apiCep'

import 'bootstrap/dist/css/bootstrap.css';
import { Form, Container } from "./styles";
import MaskedInput from 'react-text-mask';
import Alert from 'react-s-alert';
 
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';

class SignUp extends Component {
  state = {
    className: 'hidden',
    name: "",
    cpf :"",
    email: "",
    password: "",
    RetypePassword: "",
    cep: '',
    telephone: "",
    address: "",
    number: "",
    neighborhood: "",
    reference: "",
    error: ""
  };


  handleKeyDown = async e => {
    if (e.key === "Tab") {
      e.preventDefault();
      const response = await apiCep.get(this.state.cep+'/json/')   
      if(!response.data['erro']) {
        this.setState({
          address: response.data['logradouro'],
          neighborhood: response.data['bairro']
        })
      } else {
        this.setState({
          error: 'Cep Invalido!'
        })
      }     
    }
  }

  handleSignUp = async e => {
    e.preventDefault();
    const { name, cpf, email, password, telephone, address, number, neighborhood, reference, cep, RetypePassword } = this.state;
    if (password === RetypePassword){
      if (!name || !cpf || !email || !password || !telephone || !address || !number || !neighborhood || !reference || !cep || !RetypePassword) {
        this.setState({ error: "Preencha todos os dados para se cadastrar" });
      } else {
        try {
          await api.post("/user", { name, cpf, email, password, telephone, address, number, neighborhood, reference });
            this.props.history.push("/app");
        } catch (err) {
          this.setState({ error: "Ocorreu um erro ao registrar." });
        }
      }
    } else {
      this.setState({
        error: 'Senhas não Conferem, Verifique!'
      })
    }
  };

  
  render() {
    return (
      <Container>        
      <Form onSubmit={this.handleSignUp}>
      <img src={Logo} alt="logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <span>
                    {this.props.children}
                </span>
                <Alert stack={true} timeout={3000} html={true} />
          
<CardDeck>
  <Card border="light">
    <Card.Body>
          <input
            type="text"
            placeholder="Nome Completo"
            onChange={e => this.setState({ name: e.target.value })}
          />
          <MaskedInput
            type="text"
            className="form-control"
            mask={[ /[0-9]/, /\d/, /\d/, '.' ,/\d/, /\d/, /\d/, '.' ,/\d/, /\d/, /\d/, '-' ,/\d/, /\d/]}
            placeholder="CPF"
            onBlur={() => {}}
            onChange={e => this.setState({ cpf: e.target.value })} 
            guide={true}
          />
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <input
            type="RetypePassword"
            placeholder="Redigite a Senha"
            onChange={e => this.setState({ RetypePassword: e.target.value })}
          />
          <MaskedInput
            type="text"
            className="form-control"
            mask={[ /\d/,/\d/,/\d/,/\d/,/\d/, '-' ,/\d/, /\d/,/\d/]}
            placeholder="Cep"
            // onKeyUp={this.handKeyUp}
            onKeyDown={this.handleKeyDown}
            onBlur={() => {}}
            onChange={e => this.setState({ cep: e.target.value })} 
            guide={true}
          />
    </Card.Body>
  </Card>
  <Card  border="light">
    <Card.Body>
            <MaskedInput
            type="text"
            className="form-control"
            mask={['(', /[0-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholder="Telefone"
            onBlur={() => {}}
            onChange={e => this.setState({ telephone: e.target.value })}
            guide={true}
            />
            <input
            type="text"
            placeholder="Endereço"
            onChange={e => this.setState({ address: e.target.value })}
            value={this.state.address}
            />
            <input
            type="number"
            placeholder="Numero"
            onChange={e => this.setState({ number: e.target.value })}
            />
            <input
            type="text"
            placeholder="Bairro"
            onChange={e => this.setState({ neighborhood: e.target.value })}
            value={this.state.neighborhood}
            />
            <input
            type="text"
            placeholder="Referência"
            onChange={e => this.setState({ reference: e.target.value })}
            />
    </Card.Body>
  </Card>
</CardDeck>
<button type="submit">Cadastrar</button>
          <hr />
          <Link to="/">Logar</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignUp);
