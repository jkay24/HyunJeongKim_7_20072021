import "../login/login.css";
import Header from "../../components/header/Header";
import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPw] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const login = (e) => {
    e.preventDefault();
    const data = { email: email, password: password };
    Axios.post("http://localhost:3000/api/auth/login", data)
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          sessionStorage.setItem("JWToken", response.data.token);
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login">
      <Header />
      <div className="loginWrapper">
        <div className="loginTitle">Connexion</div>
        <div className="loginTop">
          <form className="loginTop__info">
            <label className="loginTop__info--email">
              Email{" "}
              <input
                type="text"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </label>
            <label className="loginTop__info--pw">
              Mot de passe{" "}
              <input
                type="text"
                name="password"
                onChange={(e) => {
                  setPw(e.target.value);
                }}
              ></input>
            </label>
          </form>
        </div>
        <div className="loginBottom">
          <button className="loginBottom__login" onClick={login}>
            Se connecter
          </button>
          <div className="loginBottom__prompt">Pas encore de compte ?</div>
          <button
            className="loginBottom__signup"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Inscrivez-vous !
          </button>
        </div>
        <div>{loginStatus}</div>
      </div>
    </div>
  );
}
