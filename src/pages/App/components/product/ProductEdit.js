import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import api from '../../../../services/api'
import Sidebar from '../fixedComponents/sidebar';
import logo from '../../../../assets/user.png'

class ProductEdit extends Component {
    state = {
        error: null,
        msg: '',
        category: [],
       
        id: '',
        name: '',
        category_id: '',
        price: '',
        description: '',
        active: '',
        mostraMsg: false,
        image: '',
        imagee: '',
        chegou: false
    }   

    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }


      handleImageChange = (e) => {
        this.setState({
          imagee: e.target.files[0]
        })
      };
    
    handleSubmit = async e => {
      e.preventDefault();
      const { id }  = this.props.match.params;
      await api.put(`/auth/product/${id}/`,
      {
        id:this.state.id,
        category_id:this.state.category_id,
        name:this.state.name,
        price:this.state.price,
        description:this.state.description,
        active:this.state.active
      })
      .then(res => {
        this.setState({
          mostraMsg: true,
          msg: 'Editado com sucesso!'
        })  

          console.log(res.data.id)
        let form_data = new FormData();
        form_data.append('image[]', this.state.imagee);
        api.post(`/auth/product/${res.data.id}/images`, form_data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .catch(err => console.log(err))
      })
    }
  
  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await api.get(`/auth/product/${id}`);
    const res = await api.get('/auth/category')
    if(response) {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          category_id: response.data.category_id,
          price: response.data.price,
          description: response.data.description,
          active: response.data.active,
          image: response.data.image
        })
        this.setState({
          category: res.data
        })
    }      
  }
 
  render() {
    const { error, category, mostraMsg, msg , image} = this.state;

    if(error) {
      return (
        <div>Error: {error}</div>
      )
    } else {
      return(
        <div>
        <Sidebar />
        <div className="home">
            <div className="card t">
            <div className="row">
                <div className="col" >
                    <h4 className="corPadrao white-text right center editProduts">Editar Produto</h4>
                    <form className="col s12" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="input-field col s4">
                                <i className="material-icons prefix">note</i>
                                <input id="account_circle" type="text" className="validate"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    required
                                    placeholder="Nome do Produto"
                                    name="name"
                                />
                                <label className="active" id="account_circle">Nome do Produto</label>
                            </div>
                            <div className="input-field col s4">
                                <i className="material-icons prefix">account_balance</i>
                                <input id="account_box" type="text" className="validate" 
                                    value={this.state.price}
                                    type="number"
                                    onChange={this.handleChange}
                                    placeholder="Preço R$ ... "
                                    required
                                    name="price"
                                />
                                <label className="active" id="account_box">Preço R$:</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s8">
                                <i className="material-icons prefix">description</i>
                                    <textarea className="validate" 
                                        name="description"
                                        required
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                        placeholder="Descrição o mais breve possivel. - ex: Pizza 4 queijos com alho"
                                    />
                                    <label className="active" id="address">Descrição do Produto</label>
                            </div>
                            <div className="input-field col s2">
                                <select className="browser-default inputUser validate " required name="active"
                                    onChange={this.handleChange}
                                    value={this.state.active}>
                                    <option onChange={this.handleChange} selected value="002">Ativar ?</option>
                                    <option onChange={this.handleChange} value="1">Ativar</option>
                                    <option onChange={this.handleChange} value="0">Desativar</option>
                                </select> 
                            </div>
                            <div className="input-field  col s2">
                                <select  className="browser-default inputUser validate"  name="category_id"
                                    onChange={this.handleChange}>
                                      <option onChange={this.handleChange} selected value="001">Categoria ?</option>
                                    {  
                                        category.map((el) => (    
                                            <option key={el.id} value={el.id} onChange={this.handleChange}>{el.title}</option>
                                        ))
                                    }
                                </select> 
                            </div>
                        </div>
                        <div className = "row col s8">
                          <label className="corPadrao white-text">Logo do Produto</label>
                          <div className = "file-field input-field">
                              <div className = "btn corPadrao">
                                <span>Selecionar</span>
                                <input type = "file" 
                                  name="image[]"
                                  accept="image/png, image/jpeg"  
                                  onChange={this.handleImageChange} 
                                  required
                                />
                              </div>
                              
                              <div className = "file-path-wrapper">
                                <input className = "file-path validate" type = "text"
                                    placeholder = "Upload file" 
                                    required
                                    />
                              </div>
                          </div>
                        </div>
                        <div className="col s2 right">
                                <img className="card-img-top imgs" 
                                    src={image == '' ? logo : image[image.length -1].url}
                                    style={{ width: '5rem', height: '5rem', borderRadius: '25rem', marginRight: '55px' }} 
                                    alt={'Foto de  ' +this.state.title} 
                                />
                            </div>
  
                        <div className="row">
                            <div className="col right s1.5">
                                <button  type="submit" 
                                    className="btn-flat btn-medium corPadrao right">
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
}

export default withRouter(ProductEdit);