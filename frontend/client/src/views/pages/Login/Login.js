import React, {useState, useEffect} from "react";
import Axios from "axios";
import { useDispatch } from 'react-redux';
import {incrementToken} from '../../../app/token/token';
import './login.css';
import { useNavigate} from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  let dispatch = useDispatch();
  let navigate = useNavigate();


  const config = {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  };

  const formData = {
    email: email,
    password: password,
  };

  useEffect(() => {
    const form = document.getElementById("submit-input");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    
  });

function tryLogin() {
    Axios.post("http://localhost:5000/login", formData, config)
      .then((response) => {
        setMessage(response.data.message);
        dispatch(incrementToken(response.data.token));
        navigate('/profile');
        
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  }

const messageDiv = () => {
  return (
    <div className="div-message">
      <p>{message}</p>
    </div>
  )
}

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />

      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      </style>

      <main>
        <div className="container">
          <div>
            <h1>Login</h1>
          </div>
          <div className="container-order">
            <form>
              <div>
                <label></label>
                <i className="material-symbols-outlined">mail</i>
                <input
                  required
                  id="post-login"
                  placeholder="Email"
                  type="text"
                  name="login"
                  value={email}
                  onChange={(event) => {
                    const value = event.target.value;
                    setEmail(value);
                  }}
                />
              </div>

              <div className="div-senha">
                <label></label>
                <i className="material-symbols-outlined">lock</i>
                <input
                  required
                  id="post-senha"
                  placeholder="Senha"
                  type="password"
                  name="senha"
                  autoComplete="true"
                  value={password}
                  onChange={(event) => {
                    const value = event.target.value;
                    setPassword(value);
                  }}
                />
              </div>
              <div className="registrar">
                <a href="http://localhost:3000/register">
                  <p>Você não tem conta? clique aqui.</p>
                </a>
              </div>
              {messageDiv()}
              <div className="submit">
                <input id="submit-input" type="button" value="entrar" onClick={tryLogin} />
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
