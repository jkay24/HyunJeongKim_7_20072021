import "../login/login.css";
import Header from "../../components/header/Header";
import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPw] = useState("");
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  //Form input validation
  const regExEmail = (value) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  };

  function formValidationEmail() {
    const isCorrect = regExEmail(email);
    document.getElementById("emailErrorMsg").innerHTML = isCorrect
      ? ""
      : "Veuillez saisir une adresse mail valide.";
    return isCorrect;
  }

  const login = (e) => {
    e.preventDefault();
    if (formValidationEmail())
      loginCall({ email: email, password: password }, dispatch);
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
                type="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              ></input>
            </label>
            <p id="emailErrorMsg"></p>
            <label className="loginTop__info--pw">
              Mot de passe{" "}
              <input
                type="password"
                name="password"
                onChange={(e) => {
                  setPw(e.target.value);
                }}
                value={password}
              ></input>
            </label>
          </form>
        </div>
        <div className="loginBottom">
          <button className="loginBottom__login" onClick={login}>
            {isFetching ? "Veuillez patienter" : " Se connecter"}
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
      </div>
    </div>
  );
}
