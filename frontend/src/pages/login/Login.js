import "../login/login.css";
import Header from "../../components/header/Header";
import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Login() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPw] = useState("");
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const login = (e) => {
    e.preventDefault();
    const data = { email: email, password: password };
    axios
      .post("http://localhost:3000/api/auth/login", data)
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          sessionStorage.setItem("JWToken", response.data.token);
          navigate("/home/${id}");
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
                type="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              ></input>
            </label>
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
