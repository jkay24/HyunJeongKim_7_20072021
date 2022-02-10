import "../login/login.css";
import Header from "../../components/header/Header";
import React, { useState } from "react";
import Axios from "axios";

export default function Signup() {
  const [firstnameReg, setFirstnameReg] = useState("");
  const [lastnameReg, setLastnameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [pwReg, setPwReg] = useState("");
  const signup = () => {
    Axios.post("http://localhost:3000/api/user/signup", {
      firstname: firstnameReg,
      lastname: lastnameReg,
      email: emailReg,
      pw: pwReg,
    }).then((response) => {
      console.log(response);
    });
  };
  //Login function
  return (
    <div className="login">
      <Header />
      <div className="loginWrapper">
        <div className="loginTitle">Inscription</div>
        <div className="loginTop">
          <form className="loginTop__info">
            <label className="loginTop__info--firstName">
              Prénom{" "}
              <input
                type="text"
                name="firstName"
                onChange={(e) => {
                  setFirstnameReg(e.target.value);
                }}
              ></input>
            </label>
            <label className="loginTop__info--lastName">
              Nom{" "}
              <input
                type="text"
                name="lastName"
                onChange={(e) => {
                  setLastnameReg(e.target.value);
                }}
              ></input>
            </label>
            <label className="loginTop__info--email">
              Email{" "}
              <input
                type="text"
                name="email"
                onChange={(e) => {
                  setEmailReg(e.target.value);
                }}
              ></input>
            </label>
            <label className="loginTop__info--pw">
              Mot de passe{" "}
              <input
                type="text"
                name="password"
                onChange={(e) => {
                  setPwReg(e.target.value);
                }}
              ></input>
            </label>
          </form>
        </div>
        <div className="loginBottom">
          <button className="loginBottom__login" onClick={signup}>
            S'inscrire
          </button>
          <div className="loginBottom__prompt">Déjà un compte ?</div>
          <button className="loginBottom__signup">Se connécter</button>
        </div>
      </div>
    </div>
  );
}