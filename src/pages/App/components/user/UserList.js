import React, { Component } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import api from '../../../../services/api'
import { withRouter} from 'react-router-dom'
import { Row, Col } from 'reactstrap';

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

  async deleteCategory(userId) {
    const id = userId;

    const res = await api.delete(`/auth/user/${id}`);
    
    if(res) {
      const payload = await api.get('/auth/user')
      
      if(payload) {
          this.setState({
              users: payload.data,
              msg: 'deletado com sucesso!'
          })
      }       
    }
   
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
          <Col sm="10">
          <h3>Usuarios</h3>
          </Col>
          <Col sm="2"><Button onClick={() => this.props.history.push(`/AddUser`)} variant="info">Novo</Button></Col> 
        </Row>
        
          <Table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Ativo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map(users => (
                  <tr key={users.id}>
                  <td>{users.id}</td>
                  <td>{users.name}</td>
                  <td>{users.email}</td>
                  <td>{users.telephone}</td> 
                  <td>{users.active === 1 ? <span>Ativo</span> : <span>Inativo</span>}</td>
                  <td>
                    <Button variant="info" onClick={() => this.props.history.push(`/user/${users.id}`)}>Edit</Button>
                    &nbsp;<Button variant="danger" onClick={() => this.deleteCategory(users.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )
    }
  }
}

export default withRouter(UserList);