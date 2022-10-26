import React, { useState, useEffect } from "react";
import "./index.css";
import Axios from "axios";
import { useNavigate} from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    const form = document.getElementById("submit-input");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  });

  const config = {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  };

  const formData = {
    name: name,
    email: email,
    password: senha,
  };

  function tryRegister() {
    Axios.post("http://localhost:5000/register", formData, config)
      .then((response) => {
        setMessage(response.data.message);
        navigate('/');
        
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
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

      <div className="body">
        <main>
          <a href="http://localhost:3000/">
            <div className="sair">
              <span className="material-symbols-outlined" to="/">
                arrow_back_ios
              </span>
            </div>
          </a>

          <div className="container">
            <div className="registrar-div">
              <h1 className="h1"> criar conta</h1>
            </div>
            <div className="container-order">
              <form>
                <div>
                  <label></label>
                  <i className="material-symbols-outlined">badge</i>
                  <input
                    required
                    id="post-nome"
                    placeholder="Nome"
                    type="text"
                    value={name}
                    name="name"
                    onChange={(event) => {
                      const value = event.target.value;
                      setName(value);
                    }}
                  />
                </div>
                <div>
                  <label></label>
                  <i className="material-symbols-outlined">mail</i>
                  <input
                    required
                    id="post-login"
                    placeholder="Email"
                    type="text"
                    name="email"
                    value={email}
                    onChange={(event) => {
                      const value = event.target.value;
                      setEmail(value);
                    }}
                  />
                </div>

                <div>
                  <label></label>
                  <i className="material-symbols-outlined">lock</i>
                  <input
                    required
                    id="post-senha"
                    placeholder="Senha"
                    type="password"
                    name="password"
                    value={senha}
                    onChange={(event) => {
                      const value = event.target.value;
                      setSenha(value);
                    }}
                  />
                </div>

                <div className="submit">
                  <p>{message}</p>
                  {/* <input type="submit" value="registrar"/> */}
                  <input
                    id="submit-input"
                    type="button"
                    value="registrar"
                    onClick={tryRegister}
                  />
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Register;
