import React, { Component } from 'react'
import { Link } from "react-router-dom";
import apiReset from "../../services/apiReset";
import { Form, Container } from "./styles";

class ForgotVolta extends Component {
    state = {
        token: '',
        password: '',
        password1: '',
        error: ''
    }

    componentDidMount(){
        this.setState({
            token: this.props.match.params.id
        })
    }


    handleSubmit = async e => {
        e.preventDefault();
        const { token, password, password1 } = this.state;
        if (password === password1){
            try {
                await apiReset.put("/passwords/confirm", { token, password });
                this.setState({
                    error: 'Senha Alterada com sucesso!'
                }) 
              } catch (err) {
                this.setState({ error: "Ocorreu um erro ao alterar senha.  o token expirou" });
              }
        } else {
            this.setState({
                error: 'Senhas não conferem !'
            })
        }
    }

    render() {

        return(
            <Container>
                <Form onSubmit={this.handleSubmit}>
                {this.state.error && <p>{this.state.error}</p>}
                    <input
                        type="password"
                        placeholder="Nova Senha"
                        required
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Repetir Senha"
                        required
                        onChange={e => this.setState({ password1: e.target.value })}
                    />
                    <button type="submit">Cadastrar Nova Senha!</button>
                        <hr />
                    <Link className="forgot" to="/">Login</Link>
                </Form>
            </Container>
        )
    }
}

export default ForgotVolta