import { createGlobalStyle } from "styled-components";

import "font-awesome/css/font-awesome.css";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  outline: none;
  overflow: hidden;
  font-family: sans-serif;
}

a {
    text-decoration: none;
}
`


export default GlobalStyle;