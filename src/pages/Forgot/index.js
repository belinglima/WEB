import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Form, Container } from "./styles";
import apiReset from "../../services/apiReset";

class Forgot extends Component {
    state = {
        email: '',
        error: ''
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { email} = this.state;
        try {
            await apiReset.post("/passwords", { email });
            this.setState({
                error: 'Email enviado com sucesso!'
            })
          } catch (err) {
            this.setState({ error: "Ocorreu um erro ao enviar EMail." });
          }
    }
    
    render() {
        return(
            <Container>
                <Form onSubmit={this.handleSubmit}>
                {this.state.error && <p>{this.state.error}</p>}
                    <label>Recuperação de Senha</label>
                    <input
                        type="email"
                        placeholder="E-mail valido"
                        onChange={e => this.setState({ email: e.target.value })}
                    />
                    <button type="submit">Enviar</button>
                    
                        <hr />
                    <Link className="forgot" to="/">Login</Link>
                </Form>
            </Container>
        )
    }
}

export default Forgot
