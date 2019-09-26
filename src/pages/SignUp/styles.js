import styled from "styled-components";

export const Container = styled.div`
  display: flex;


  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: auto;
  
`;
 
export const Form = styled.form`
  width: 800px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0px;

  @media (max-width: 768px) {
    img {
      display: none;
    }
  }
  img {
    width: 250px;
    margin: 0 0 0;
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
    padding: 5px 20px;
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
    width: 50%;
    margin: 5px 0; 
  }
  hr {
    margin: 10px 0;
    border: none;
    border-bottom: 1px solid 	#C71585;
    width: 50%;
  }
  a {
    font-size: 16;
    font-weight: bold;
    color: #C71585;
    text-decoration: none;
  }
`;