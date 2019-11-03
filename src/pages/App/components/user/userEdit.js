import React, { Component } from 'react';
import Sidebar from '../fixedComponents/sidebar'
import { withRouter} from 'react-router-dom'
import logo from '../../../../assets/user.png'
import api  from '../../../../services/api'

class userEdit extends Component {
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
      image: [],
      msg: '',
      mostraMsg: false
    }
 
    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

  handleSubmit = async e => {
    e.preventDefault();
    const { id } = this.props.match.params;
    await api.put(`/auth/user/${id}`,{
      name:this.state.name,
      cpf:this.state.cpf,
      email:this.state.email,
      password:this.state.password,
      telephone:this.state.telephone,
      address:this.state.address,
      number:this.state.number,
      neighborhood:this.state.neighborhood,
      active:this.state.active,
      isAdmin:this.state.isAdmin,
      reference:this.state.reference})
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
            active: '',
            isAdmin: '',
            mostraMsg: true,
            msg: 'Usuário atualizado com sucesso!',
            image: ''
          })
      }
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await api.get(`/auth/user/${id}`);
    if(response) {
        this.setState({
            id: response.data.id,
            name:response.data.name,
            cpf:response.data.cpf,
            email:response.data.email,
            password:response.data.password,
            telephone:response.data.telephone,
            address:response.data.address,
            number:response.data.number,
            neighborhood:response.data.neighborhood,
            reference:response.data.reference,
            active:response.data.active,
            isAdmin:response.data.isAdmin,
            image:response.data.images
        })
    }      
}

  render() {
    const { msg, mostraMsg, image } = this.state;
    return(
        <div>
        <Sidebar />
        <div className="home">
            <div className="card">
            <div className="row">
                <div className="col">
                    <h4 className="corPadrao white-text right center editUser">Editar Usuário</h4>
                    <form className="col s12" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="input-field col s3">
                                <i className="material-icons prefix">account_circle</i>
                                <input id="account_circle" type="text" className="validate"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    required
                                    placeholder="Nome do Usuário"
                                    name="name"
                                />
                                <label className="active" id="account_circle">Nome</label>
                            </div>
                            <div className="input-field col s3">
                                <i className="material-icons prefix">account_box</i>
                                <input id="account_box" type="text" className="validate" 
                                    value={this.state.cpf}
                                    onChange={this.handleChange}
                                    placeholder="CPF ex: 000.000.000-00"
                                    required
                                    name="cpf"
                                />
                                <label className="active" id="account_box">CPF</label>
                            </div>
                            <div className="input-field col s3">
                                <i className="material-icons prefix">email</i>
                                <input id="email" type="text" className="validate" 
                                    name="email"
                                    required
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    placeholder="E-Mail ex: email@email.com"
                                />
                                <label className="active" id="email">E-Mail</label>
                            </div>
                            <div className="input-field col s3">
                                <i className="material-icons prefix">fingerprint</i>
                                <input id="fingerprint" type="password" className="validate" 
                                    name="password"
                                    required
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    placeholder="Senha criptografada "
                                />
                                <label className="active" id="fingerprint">Senha</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <i className="material-icons prefix">phone</i>
                                <input id="phone" type="text" className="validate"
                                    value={this.state.telephone === null ? '' : this.state.telephone}
                                    onChange={this.handleChange}
                                    required
                                    placeholder="Numero de Telefone ex: 53 99999.9999"
                                    name="telephone"
                                />
                                <label className="active" id="phone">Telefone</label>
                            </div>
                            <div className="input-field col s6">
                                <i className="material-icons prefix">house</i>
                                <input id="house" type="text" className="validate" 
                                   name="address"
                                   required
                                   value={this.state.address === null ? '' : this.state.address}
                                   onChange={this.handleChange}
                                   placeholder="Endereço - ex: Av. Bento Gonçalves"
                                />
                                <label className="active" id="house">Endereço</label>
                            </div>
                            <div className="input-field col s3">
                                <i className="material-icons prefix">address</i>
                                <input id="icon_telephone" type="number" className="validate" 
                                 name="number"
                                 required
                                 value={this.state.number === null ? '' : this.state.number}
                                 onChange={this.handleChange}
                                 placeholder="Numero da Residência - ex: 521"
                                />
                                <label className="active" id="icon_telephone">Numero</label>
                            </div>
                            <div className="input-field col s3">
                                <i className="material-icons prefix">address</i>
                                <input id="address" type="text" className="validate" 
                                 name="neighborhood"
                                 required
                                 value={this.state.neighborhood === null ? '' : this.state.neighborhood}
                                 onChange={this.handleChange}
                                 placeholder="Nome do Bairro"
                                />
                                <label className="active" id="address">Bairro</label>
                            </div>
                            <div className="input-field col s9">
                                <i className="material-icons prefix">address</i>
                                    <textarea className="validate" 
                                        name="reference"
                                        required
                                        value={this.state.reference === null ? '' : this.state.reference}
                                        onChange={this.handleChange}
                                        placeholder="Referência de Entrega. - ex: Rua ao lado do krolow"
                                    />
                                    <label className="active" id="address">Referência</label>
                            </div>
                            <div className="row">
                                <div className=" col s2 right">
                                    <img className="card-img-top" 
                                        src={image == '' ? logo : image[0].url}
                                        style={{ width: '5rem', height: '5rem', borderRadius: '25rem', marginRight: '55px' }} 
                                        alt={'Foto de  ' +this.state.name.split(' ')[0]} 
                                    />
                                </div>
                            </div>
                            <div className="input-field col s3">
                                <select className="browser-default inputUser validate "  name="active"
                                    onChange={this.handleChange}
                                    value={this.state.active === null ? '' : this.state.active}>
                                    <option  disabled defaultValue onChange={this.handleChange} 
                                        value={this.state.active === 1 ? 1 : 0}>
                                        Está {this.state.active === 1 ? "Ativo" : "Desativado"}
                                    </option>
                                    <option onChange={this.handleChange} value="0">Desativar</option>
                                    <option onChange={this.handleChange} value="1">Ativar</option>
                                </select> 
                            </div>
                            <div className="input-field  col s3">
                                <select  className="browser-default inputUser validate"  name="isAdmin"
                                    onChange={this.handleChange}
                                    value={this.state.isAdmin}>
                                    <option onChange={this.handleChange} defaultValue disabled value={this.state.isAdmin === 1 ? 1 : 0}>É {this.state.isAdmin === 1 ? "Administrador" : "Usuário"}</option>
                                <option onChange={this.handleChange} value="1">Administrador</option>
                                <option onChange={this.handleChange} value="0">Usuário</option>
                                </select> 
                            </div>
                        </div>
                        <div className="row">
                            <div className="col right s1.5">
                                <button  type="submit" 
                                    className="btn-flat btn-medium corPadrao right ">
                                    <i className="material-icons white-text">save</i>
                                </button>
                                &nbsp;
                                <a  onClick={this.props.history.goBack}
                                    className="btn-flat btn-medium corPadrao left ">
                                    <i className="material-icons white-text">keyboard_arrow_left</i>
                                    
                                </a>
                            </div>
                            <div className="col s10 center">
                                { mostraMsg ?  <div className="msgg">{ msg }</div> : ''}
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
      </div>
    </div>
    )
  }
}

export default withRouter(userEdit);