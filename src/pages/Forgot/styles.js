import styled from "styled-components";
import "../../styles/global"

export const Container = styled.div`
  display: flex;
  margin: -70px;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
`;

export const Form = styled.form`
  width: 300px;
  background: #fff;
  padding: 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    .forgot {
      color: #fff;
      font-size: 16px;
      background: #C71585;
      height: 30px;
      border: none;
      border-radius: 50px;
      width: 60%;
      text-align: center;
      padding: 5px;
    }   
  }
  img {
    width: 80%;
    margin: 0px 0 0px;
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
    margin-bottom: 10px;
    padding: 5px 15px;
    border-radius: 70px; 
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
    height: 30px;
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