import React from 'react'
import { AppContainer } from './styles';
import Sidebar from './components/fixedComponents/sidebar';

function App(){
  return(
  <React.Fragment>
    <AppContainer>
      <Sidebar />
       <div className="present">
          Seja bem Vindo, selecione as opções do menu para continuar.
        </div>
    </AppContainer>
  </React.Fragment>
  )
}

export default App



