import React, { Component } from 'react';
import api  from '../../../../services/api'
import Sidebar from '../fixedComponents/sidebar'

class AddCategory extends Component {
    state = {
      title: '',
      description: 'Ajustar',
      active: true,
      msg: '',
      mostraMsg: false,
      image: null,
      chegou: false
    }

    handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleImageChange = (e) => {
      this.setState({
        image: e.target.files[0]
      })
    };
  
    handleSubmit = async e => {
      e.preventDefault();
      // console.log(this.state);
  
        await api.post('/auth/category',{
              title:this.state.title,
              description:this.state.description,
              active:this.state.active
            })
            .then(res => {
              this.setState({
                mostraMsg: true,
                msg: 'Cadastrada com sucesso!'
              })  

              let form_data = new FormData();
              form_data.append('image[]', this.state.image);
              api.post(`/auth/category/${res.data.id}/images`, form_data, {
                headers: {
                  'content-type': 'multipart/form-data'
                }
              })
              .catch(err => console.log(err))
            })
          }

    render() {
      const { msg, mostraMsg } = this.state;
      return(
        <div>
        <Sidebar />
        <div className="home">
            <div className="card diminui">
              <div className="row">
                <div className="col s12">
                   <h4 className="corPadrao white-text produto right">Cadastrar Categoria</h4>
                  <form className="col s12" onSubmit={this.handleSubmit}>
              
                      <div className="input-field col s12 tt">
                        <i className="material-icons prefix">bookmarks</i>
                        <input id="account_circle" type="text" className="validate"
                            value={this.state.title}
                            onChange={this.handleChange}
                            required
                            placeholder="Nome da Categoria"
                            name="title"
                        />
                        <label className="active" id="account_circle">Categoria</label>
                      </div>
                     
                      <div className = "row col s12">
                        <label className="corPadrao white-text">Logo da Categoria</label>
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

                    
                   
                    <div className="row">
                      <div className="col right s1.0">
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
                      <div className="col s10">
                          { mostraMsg ?  <div className="msgg">{ msg }</div> : ''}
                      </div>
                      <br />
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

export default AddCategory;