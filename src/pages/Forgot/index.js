import React, { Component } from 'react'
import { Link } from "react-router-dom";
import apiReset from "../../services/apiReset";
import Logo from "../../assets/logo.png";

class Forgot extends Component {
    state = {
        email: '',
        error: ''
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { email} = this.state;
        if (!email) {
            this.setState({ error: "Preencha ( E-Mail ) para continuar!" });
            return
        } else {
            try {
                await apiReset.post("/passwords", { email });
                this.setState({
                    error: 'Email enviado com sucesso!'
                })
            } catch (err) {
                this.setState({ error: "Ocorreu um erro ao registrar email." });
            }
        }
    }
    
    render() {
        return(
        <div className="container centered">
            <div className="col s12 login">
                <div className="card darken-1 c">
                        <div className="card-content white-text">
                        <form onSubmit={this.handleSubmit}>
                            <img src={Logo} alt="logo" className="imgLogin" />
                            <div>
                                <p className="links">Recuperação de Senha!</p>
                                <input
                                    type="email"
                                    placeholder="E-mail valido"
                                    className="browser-default input"
                                    onChange={e => this.setState({ email: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="bowser-default button">Enviar</button>
                            <Link className="links" to="/">Login</Link>
                        </form>
                    </div>
                </div>
                { this.state.error ? 
                <div className="msg">
                    {this.state.error}
                </div>
                : ''}
            </div>
        </div>
        )
    }
}

export default Forgot