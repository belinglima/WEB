import React, { Component } from 'react';
import { withRouter} from 'react-router-dom'

import swal from 'sweetalert';
import api from '../../../../services/api'

class UserList extends Component {
  state = {
      error: null,
      users: [],
      response: {},
      msg: '',
      ativo: '',
      inativo: '',
      showStore: false
  }
  
  async componentDidMount() {
    const response = await api.get('/auth/user')
    // console.log(response.data)
    if(response) {
        this.setState({
            users: response.data
        })
    }   
   
  }

  async vay(userId) {
    const id = userId;
    const res = await api.delete(`/auth/user/${id}`);
    if(res) {
      const payload = await api.get('/auth/user')
      if(payload) {
          this.setState({
              users: payload.data
          })
      }       
    }
  }

  deleteUser(UserId, userName) {  
    swal({
      title: "Deletar usuário?",
      text: userName,
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancelar", "Deletar"],
    }).then((willDelete) => {
      if (willDelete) {
        this.vay(UserId)
      } 
    });
  }

  render() {
    const { error, users } = this.state;

    const filtro = document.getElementById('search');
    const tabela = document.getElementById('datatable');
    if (filtro != null){
        filtro.onkeyup = function() {
        var nomeFiltro = filtro.value;
            for (var i = 1; i < tabela.rows.length; i++) {
                var conteudoCelula = tabela.rows[i].cells[0].innerText;
                var corresponde = conteudoCelula.indexOf(nomeFiltro) >= 0;
                tabela.rows[i].style.display = corresponde ? '' : 'none';
            }
        };
    }

    if(error) {
      return (
        <div>Error: {error}</div>
      )
    } else {
      return(
        <div className="home">
          
          <div className="row">
          {/* <div id="myDIV" style={{display: this.state.showStore ? 'block' : 'none' }}> */}
          {/* </div> */}
            <div className="col right">
              <a onClick={() => this.props.history.push(`/AddUser`)} 
                className="btn-flat btn-medium corPadrao right ">
                <i className="material-icons white-text">add</i>
              </a>
            </div>
          </div>
          <div className="row">
            <div  className="col s12">
              <div className="card material-table">     
              <div className="dataTabless_filter">
                <label>Busca de Usuarios:<input type="search" id="search" placeholder="" aria-controls="datatable" />
                </label>
              </div>
              <table id="datatable">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-Mail</th>
                  <th>Ativo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
              {users.map((users) => (  
                <tr key={users.id}>
                  <td>{users.name}</td>
                  <td>{users.email}</td>
                  <td>{users.active === 1 ? 'Ativo' : 'Inativo'}</td>
                  <td>
                    <a onClick={() => this.props.history.push(`/user/${users.id}`)}>
                      <div className="btn-flat corPadrao darken-4">
				          				<i className="material-icons white-text">edit</i>
				          		</div>
                    </a>
                    &nbsp;
                    <a  onClick={() => this.deleteUser(users.id, users.name)}>
                        <div className="btn-flat corPadrao darken-4">
                          <i className="material-icons white-text">delete</i>
				          			</div>
                    </a>
                  </td>
                </tr>
              ))}
             </tbody>
            </table>
          </div>
        </div>
      </div>

          {/* {users.map((users) => (
            <div className="col cardUsuario" key={users.id}>
              <div className="card">
                <div className="card-image">
                  <img className="card-img-top" 
                    src={users.images[0] == null ? logo : users.images[0].url}  
                    alt={'Foto de  '+users.name} 
                  />
                  <a  onClick={() => this.deleteUser(users.id, users.name)}
                    className="btn-floating halfway-fab waves-effect waves-light right corPadrao">
                    <i className="material-icons">delete</i>
                  </a>
                  &nbsp;
                  <a onClick={() => this.props.history.push(`/user/${users.id}`)}
                      className="btn-floating btn-tail halfway-fab waves-effect left waves-light corPadrao">
                    <i className="material-icons">edit</i>
                  </a>
                </div>
                <div className="card-content">
                  <span className="card-header black-text">{users.name}</span>
                </div>
              </div>
            </div>
          ))} */}

        </div>
      )
    }
  }
}

export default withRouter(UserList);