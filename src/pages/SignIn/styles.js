import styled from "styled-components";
import "../../styles/global"

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
`;

export const Form = styled.form`
  width: 400px;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 250px;
    margin: 10px 0 40px;
  }
  p {
    color: #EE82EE;
    margin-bottom: 10px;
    border-bottom: 1px solid #EE82EE;
    border-top: 1px solid #EE82EE;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  input {
    flex: 1;
    margin-bottom: 15px;
    padding: 8px 20px;
    border-radius: 50px; 
    color: 	#FF69B4;
    font-size: 15px;
    width: 100%;
    border: 1px solid 	#FF69B4;
    &::placeholder {
      color: #C71585;
    }
  }
  button {
    color: #fff;
    font-size: 16px;
    background: #C71585;
    height: 40px;
    border: none;
    border-radius: 50px;
    width: 100%;
  }
  hr {
    margin: 10px 0;
    border: none;
    border-bottom: 1px solid 	#C71585;
    width: 100%;
  }
  a {
    font-size: 16;
    font-weight: bold;
    color: #C71585;
    text-decoration: none;
  }
`;