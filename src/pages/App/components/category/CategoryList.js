import React, { Component } from 'react';
import api from '../../../../services/api'
import { withRouter} from 'react-router-dom'
import swal from 'sweetalert';
import logo from '../../../../assets/user.png'

class CategoryList extends Component {
    state = {
        error: null,
        category: [],
        response: {},
        msg: '',
        mostraMsg: false
    }
  
  async componentDidMount() {
    const response = await api.get('/auth/category/');


        this.setState({
            category: response.data
        })
     
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
      buttons: ["Cancelar", "Deletar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.vay(productId)
        this.setState({
          msg: 'Categoria deletada com sucesso.'
        })
      } 
    });
  }

  render(props) {
    const { error, category, mostraMsg, msg } = this.state;
    if(error) {
      return (
        <div>Error: {error}</div>
      )
    } else {
      return(
        <div className="home">
          <div className="row">

        {this.state.msg !== '' &&
          <div className="col s10 msg center ajuste"> 
            {this.state.msg}
          </div>
        }
            <div className="col s2 right">
              <a onClick={() => this.props.history.push(`/AddCategory`)} 
                className="btn-flat btn-medium corPadrao right ">
                <i className="material-icons white-text">add</i>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="row">
                {category.map((category) => (
                <div className="col s2 cardCategory" key={category.id}>
                  <div className="card cardCategory">
                    <div className="card-image center">
                      <img className="card-img-top imgtamanho" 
                        src={category.image[0] == null ? logo : category.image[category.image.length -1].url}                         alt={'Foto de  '+category.title} 
                      />
                      <span className="card-header red-text">{category.title}</span>
                    </div>
                    <div className="card-content">
                    <a  onClick={() => this.deleteCategory(category.id, category.title)}
                        className="btn-flat halfway-fab right corPadrao">
                        <i className="material-icons white-text">delete</i>
                      </a>
                      &nbsp;
                      <a onClick={() => this.props.history.push(`/category/${category.id}`)}
                          className="btn-flat  halfway-fab corPadrao">
                        <i className="material-icons white-text">edit</i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )
    }
  }
}

export default withRouter(CategoryList);