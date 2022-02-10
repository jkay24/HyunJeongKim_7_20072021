import "../login/login.css";
import Header from "../../components/header/Header";
import React, { useState } from "react";
import Axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const login = () => {
    Axios.post("http://localhost:3000/api/user/login", {
      email: email,
      pw: pw,
    }).then((response) => {
      console.log(response);
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
          <button className="loginBottom__signup">S'inscrire</button>
        </div>
      </div>
    </div>
  );
}
