import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from "../../assets/logo.png";

import api from "../../services/api";
import apiCep from '../../services/apiCep'


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
            this.props.history.push("/");
        } catch (err) {
          this.setState({ error: "Cadastrado com Sucesso!" });
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
      <div>        
      <form onSubmit={this.handleSignUp}>
      <img src={Logo} alt="logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <span>
                    {this.props.children}
                </span>
                <div stack={true} timeout={3000} html={true} />
          
<div>
  <div border="light">
    <div>
          <input
            type="text"
            placeholder="Nome Completo"
            onChange={e => this.setState({ name: e.target.value })}
          />
          <input
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
          <input
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
    </div>
  </div>
  <div  border="light">
    <div>
            <input
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
    </div>
  </div>
</div>
<button type="submit">Cadastrar</button>
          <hr />
          <Link to="/">Logar</Link>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUp);