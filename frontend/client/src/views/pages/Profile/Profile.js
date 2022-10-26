import "./profile.css";
import React, { useEffect, useState } from "react";
// import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";

const Profile = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  let selector = useSelector((state) => state.token);
  let navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:5000/authlogin", {
      headers: { Authorization: selector.token },
    })
      .then((response) => {
        setId(response.data._id);
        setName(response.data.name);
        setEmail(response.data.email);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  });

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
        <a href="http://localhost:3000/">
          <div className="sair">
            <span className="material-symbols-outlined" to="/">
              arrow_back_ios
            </span>
          </div>
        </a>

        <div className="container-profile">
          <div className="container-box">
            <div className="container-h1">
              <h1>Profile</h1>
            </div>
            <div className="container-list">
              <ul>
                <li>
                  <strong>Id:</strong> {id}
                </li>
                <li>
                  <strong>Nome:</strong> {name}
                </li>
                <li>
                  <strong>Email:</strong> {email}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
