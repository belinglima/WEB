import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';
import api from '../../../../services/api'
import { withRouter} from 'react-router-dom'
import { Row, Col, ButtonGroup } from 'reactstrap';
import swal from 'sweetalert';

import logo from '../../../../assets/user.png'

const styles = {
  button: {
    background: '#C71585',
    width: '3rem', 
    height: '3rem' ,
    borderRadius: '25rem',
    border: '1px solid #C71585',
    margin: '0 0 0.5em'
  },
  card: {
    border: '1px solid #C71585',
    width: '10rem', 
    height: '10rem',
    margin: '0 0 0.5em',
  },
  btn: {
    border: '1px solid #C71585',
  },
  hr: {
    padding: '10px 0 0.10px'
  }
};

class UserList extends Component {
  state = {
      error: null,
      users: [],
      response: {},
      msg: '',
      ativo: '',
      inativo: ''
  }
  
  async componentDidMount() {
    const response = await api.get('/auth/user')
    console.log(response.data)
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

  deleteUser(UserId) {
    swal({
      title: "Você tem certeza?",
      text: "Esse usuário será deletado!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.vay(UserId)
      } else {
        swal("Usuário Não será Deletado");
      }
    });
  }

  render(props) {
    const { error, users} = this.state;
    if(error) {
      return (
        <div>Error: {error}</div>
      )
    } else {
      return(
        <div>
        <Row>
          <Col sm="11">
            {this.state.msg !== '' && <Alert variant="success">{this.state.msg}</Alert>}
            {this.state.response.message && <Alert variant="success">{this.state.response.message}</Alert>}
          </Col>
        </Row>
         <Row>
            <Col sm="11">
              <h3>Usuarios</h3>
            </Col>
            <Col sm="1">
                <Button onClick={() => this.props.history.push(`/AddUser`)} className="button" 
                  style={styles.button}
                 ><b>+</b>
                </Button>
            </Col> 
        </Row>
        <Row>
        {users.map((users) => (
          <Col sm="2"  key={users.id}>
          <div className="card text-center " style={styles.card}>
          {users.name}
            <div className="card-body" style={styles.hr}>
                <img className="card-img-top" src={users.images[0] == null ? logo : users.images[0].url} style={{ width: '5rem', height: '5rem', borderRadius: '25rem', padding: '5px' }} alt={'Foto de  '+users.name} />
              <ButtonGroup aria-label="Basic example">
                <Button variant="btn  btn-sm" onClick={() => this.props.history.push(`/user/${users.id}`)} style={styles.btn}>Editar</Button>
                  &nbsp;
                <Button variant="btn  btn-sm" onClick={() => this.deleteUser(users.id)} style={styles.btn}>Deletar</Button>
              </ButtonGroup>
            </div>
          </div>
          </Col>
        ))}
        </Row>
        </div>
      )
    }
  }
}

export default withRouter(UserList);