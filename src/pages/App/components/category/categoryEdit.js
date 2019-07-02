import React, { Component } from 'react'
import {withRouter}  from 'react-router-dom'
import {  Row, Form, Col, Button, Alert } from 'react-bootstrap';
import api from '../../../../services/api'
import Sidebar from '../fixedComponents/sidebar';
import { CategoryContainer } from '../../styles';

class categoryEdit extends Component {
        state = {
            error: null,
            msg: '',
            category: [],
           
            id: '',
            title: '',
            description: '',
            active: ''
        }   
    
        handleChange = e => {
            this.setState({
              [e.target.name]: e.target.value
            })
          }
        
        handleSubmit = async e => {
            e.preventDefault();
            const { id }  = this.props.match.params;
            await api.put(`/auth/category/${id}/`,
            {id:this.state.id,title:this.state.title,description:this.state.description,active:this.state.active});
            this.setState({
                msg: 'atualizada com sucesso!'
            })       
        }      
        async componentDidMount() {
                const { id } = this.props.match.params;
                const response = await api.get(`/auth/category/${id}`);
                const res = await api.get('/auth/category')
                if(response) {
                    this.setState({
                        id: response.data.id,
                        title: response.data.title,
                        description: response.data.description,
                        active: response.data.active,
                    })
                    this.setState({
                        category: res.data
                    })
                }      
                console.log(this.state)
      }

    render() {
            const { error} = this.state;
        if(error) {
            return(
                 <div>Error: <Alert variant="info">{error}</Alert></div>
             )
        } else {
            return(
            <CategoryContainer>
            <Sidebar />
        <div>
        <Row>
        <Col sm="11">
        {this.state.msg !== '' && <Alert variant="success">{this.state.msg}</Alert>}
        </Col>
      </Row>
          <h3>Editar Categoria</h3>
          <Row>
          <Col sm={4}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  placeholder="Nome da Categoria"/>
              </Form.Group>
              <Form.Group controlId="active">
                <Form.Label>Ativa ?</Form.Label>
                <Form.Control as="select" name="active" onChange={this.handleChange}>
                <option onChange={this.handleChange} value={this.state.active === 1 ? 1 : 0}>Está {this.state.active === 1 ? "Ativa" : "Inativa"}</option>
                <option onChange={this.handleChange} value="1">Ativa</option>
                <option onChange={this.handleChange} value="0">Inativa</option>
                </Form.Control>
                </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>descrição</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  placeholder="Descrição" />
              </Form.Group>
              <Form.Group>
                <Form.Control type="hidden" name="id" value={this.state.id} />
                <Button variant="success" type="submit">Save</Button>&nbsp;&nbsp; 
                <Button onClick={this.props.history.goBack} variant="warning">Voltar</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        </div>
        </CategoryContainer>
            )
        }
    }
}
        


export default withRouter(categoryEdit)