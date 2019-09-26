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

  async vay(categoryId) {
    const id = categoryId;
    const res = await api.delete(`/auth/category/${id}`);
    if(res) {
      const payload = await api.get('/auth/category')
      if(payload) {
          this.setState({
              category: payload.data
          })
      }       
    }
  }

  deleteCategory(productId) {
    swal({
      title: "Você tem certeza?",
      text: "Sua Categoria será deletada e pode conter produtos, que tambem serão deletados!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.vay(productId)
      } else {
        swal("Categoria Não será deletada");
      }
    });
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
          <Col sm="11">
          <h3>Categorias</h3>
          </Col>
          <Col sm="1">
              <Button onClick={() => this.props.history.push(`/AddCategory`)} className="button" 
                style={styles.button}
                ><b>+</b>
            </Button>
          </Col> 
        </Row>
        <Row>
        {category.map((category, i) => (
          <Col sm="2"  key={category.id}>
          <div className="card text-center " style={styles.card}>
          {category.title}
          <div className="card-body" style={styles.hr}>
                <img className="card-img-top" src={category.image[0] == null ? logo : category.images[0].url} style={{ width: '5rem', height: '5rem', borderRadius: '25rem' }} alt={'Foto de  '+category.name} />
              <ButtonGroup aria-label="Basic example">
                <Button variant="btn  btn-sm" onClick={() => this.props.history.push(`/category/${category.id}`)} style={styles.btn}>Editar</Button>
                  &nbsp;
                <Button variant="btn  btn-sm" onClick={() => this.deleteCategory(category.id)} style={styles.btn}>Deletar</Button>
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

export default withRouter(CategoryList);