import React, { Component } from 'react'
import {withRouter}  from 'react-router-dom'
import api from '../../../../services/api'
import Sidebar from '../fixedComponents/sidebar';
import logo from '../../../../assets/user.png'

class categoryEdit extends Component {
        state = {
            error: null,
            msg: '',
            category: [],
            id: '',
            title: '',
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
          // console.log(this.state);
          const { id }  = this.props.match.params;
     
          await api.put(`/auth/category/${id}`,
          {
            id:this.state.id,
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
            form_data.append('image[]', this.state.imagee);
            api.post(`/auth/category/${res.data.id}/images`, form_data, {
              headers: {
                'content-type': 'multipart/form-data'
              }
            })
            .catch(err => console.log(err))
          })
        }
        
        // handleSubmit = async e => {
        //     e.preventDefault();
        //     // console.log(this.state);
        //     let form_data = new FormData();
        //     const { id }  = this.props.match.params;

        //     form_data.append('image[]', this.state.imagee);
        //     api.post(`/auth/category/${id}/images`, form_data, {
        //       headers: {
        //         'content-type': 'multipart/form-data'
        //       }
        //     })
        //     .then(res => {
        //       this.setState({
        //         chegou: true
        //       })
        //     })
        //     .catch(err => console.log(err))
            

        //     if(this.state.chegou){  
        //       await api.put(`/auth/category/${id}`,
        //       {id:this.state.id,
        //         title:this.state.title,
        //         description:this.state.description,
        //         active:this.state.active
        //       });
        //       this.setState({
        //         mostraMsg: true,
        //         msg: 'atualizada com sucesso!'
        //       })     
        //     } 
        // }      

        async componentDidMount() {
          const { id } = this.props.match.params;
          const response = await api.get(`/auth/category/${id}`);
          const res = await api.get('/auth/category')
          // console.log(response.data.image[response.data.image.length -1].url)
          if(response) {
              this.setState({
                  id: response.data.id,
                  title: response.data.title,
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
            const { error, msg, mostraMsg, image } = this.state;
            if(error) {
                return(
                    <div>Error: {error}</div>
                )
            } else {
                return(
                <div>
                <Sidebar />
                <div className="home">
                    <div className="card diminui">
                      <div className="row">
                        <div className="col s8">
                           <h4 className="corPadrao white-text teste right">Editar Categoria</h4>
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
                             
                              <div className = "row">
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

                            <div className="col s2 right">
                                <img className="card-img-top imgs" 
                                    src={image == '' ? logo : image[image.length -1].url}
                                    style={{ width: '5rem', height: '5rem', borderRadius: '25rem', marginRight: '55px' }} 
                                    alt={'Foto de  ' +this.state.title} 
                                />
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
}
        


export default withRouter(categoryEdit)