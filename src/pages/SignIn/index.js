import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from "../../assets/logo.png";
import api from "../../services/api";
import { login, logout } from "../../services/auth";


class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha ( E-Mail e Senha ) para continuar!" });
    } else {
      try {
        const response = await api.post("/sessions", { email, password });
        if (response.data.isAdmin === 1){
          login(response.data.token.token);
          localStorage.setItem('nome', response.data.nome);
          this.props.history.push("/app");
        }else {
          this.setState({
            error: 'Somente Administrador pode entrar Aqui.'
          })
        }
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login."
        });
      }
    }
  };

  render() {
	logout();
    return (
      <div className="container centered">
        <div className="col s12 login">
          <div className="card darken-1 c">
            <div className="card-content white-text">
               <form onSubmit={this.handleSignIn}>
                <img src={Logo} alt="logo" className="imgLogin" />
                <div>
                  <input
                      type="email"
                      className="browser-default input"
                      placeholder="Endereço de e-mail"
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                    <input
                      type="password"
                      placeholder="Senha"
                      className="browser-default input"
                      onChange={e => this.setState({ password: e.target.value })}
                    />
                </div>
                  <button type="submit" className="bowser-default button" >Entrar</button>

                  <Link className="links" to="/forgot">Esqueceu a Senha?</Link>
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
    );
  }
}

export default withRouter(SignIn);