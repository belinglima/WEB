import React, { Component } from 'react'
import { Link } from "react-router-dom";
import apiReset from "../../services/apiReset";
import Logo from "../../assets/logo.png";

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
        let equals = password === password1 ? true : false
        let falta =  !password && !password1 ? false : true
        if (falta){
            if(equals){
                try {
                    await apiReset.put("/passwords/confirm", { token, password });
                    this.setState({
                        error: 'Senha Alterada com sucesso!'
                    }) 
                } catch (err) {
                    this.setState({ error: "Ocorreu um erro ao alterar senha.  o token expirou" });
                }
            }else {
                this.setState({ error: 'Senhas não conferem !' })
            }
        } else {
            this.setState({ error: "Preencha ( Senhas ) para continuar!" });
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
                                    type="password"
                                    placeholder="Nova Senha"
                                    className="browser-default input"
                                    onChange={e => this.setState({ password: e.target.value })}
                                />
                                <input
                                    type="password"
                                    className="browser-default input"
                                    placeholder="Repetir Senha"
                                    onChange={e => this.setState({ password1: e.target.value })}
                                />
                            </div>
                            <button className="bowser-default button" type="submit">Cadastrar Nova Senha!</button>
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

export default ForgotVolta