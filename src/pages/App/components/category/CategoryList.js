import React, { Component } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import api from '../../../../services/api'
import { withRouter} from 'react-router-dom'
import { Row, Col } from 'reactstrap';

class CategoryList extends Component {
    state = {
        error: null,
        category: [],
        response: {},
        msg: ''
    }
  
  async componentDidMount() {
            const response = await api.get('/auth/category')
            console.log(response.data)
            if(response) {
                this.setState({
                    category: response.data
                })
            }   
  }

  async deleteCategory(categoryId) {
    const id = categoryId;

    const res = await api.delete(`/auth/category/${id}`);
    
    if(res) {
      const payload = await api.get('/auth/category')
      
      if(payload) {
          this.setState({
              category: payload.data,
              msg: 'deletado com sucesso!'
          })
      }       
    }
   
  }

  render(props) {
    const { error, category} = this.state;

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
          <h3>Categorias</h3>
          </Col>
          <Col sm="2"><Button onClick={() => this.props.history.push(`/AddCategory`)} variant="info">Nova</Button></Col> 
        </Row>
        
          <Table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Ativo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {category.map(category => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.title}</td>
                  <td>{category.description}</td>
                  <td>{category.active === 1 ? <span>Ativo</span> : <span>Inativo</span>}</td>
                  <td>
                    <Button variant="info" onClick={() => this.props.history.push(`/category/${category.id}`)}>Edit</Button>
                    &nbsp;<Button variant="danger" onClick={() => this.deleteCategory(category.id)}>Delete</Button>
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

export default withRouter(CategoryList);