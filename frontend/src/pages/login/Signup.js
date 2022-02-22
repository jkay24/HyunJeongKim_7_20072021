import "../login/login.css";
import Header from "../../components/header/Header";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  let navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  //Form input validation
  const regExNames = (value) => {
    return /^[a-zA-Z\s]{2,20}$/.test(value);
  };
  const textAlert = (value) => {
    return `Veuillez saisir un ${value} valide entre 2 à 20 lettres, sans chiffre ni symbole.`;
  };

  const regExEmail = (value) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  };

  const regExPassword = (value) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/.test(value);
  };

  function formValidationFirstName() {
    const isCorrect = regExNames(firstname);
    document.getElementById("firstNameErrorMsg").innerHTML = isCorrect
      ? ""
      : textAlert("prénom");
    return isCorrect;
  }
  function formValidationLastName() {
    const isCorrect = regExNames(lastname);
    document.getElementById("lastNameErrorMsg").innerHTML = isCorrect
      ? ""
      : textAlert("nom");
    return isCorrect;
  }
  function formValidationEmail() {
    const isCorrect = regExEmail(email);
    document.getElementById("emailErrorMsg").innerHTML = isCorrect
      ? ""
      : "Veuillez saisir une adresse mail valide.";
    return isCorrect;
  }
  function formValidationPassword() {
    const isCorrect = regExPassword(pw);
    document.getElementById("passwordErrorMsg").innerHTML = isCorrect
      ? ""
      : "Veuillez saisir un mot de passe avec au moins 6 caractères, comprenant une lettre maj, une min et un chiffre.";
    return isCorrect;
  }

  const signup = () => {
    if (
      formValidationFirstName() &&
      formValidationLastName() &&
      formValidationEmail() &&
      formValidationPassword()
    )
      axios
        .post("http://localhost:3000/api/auth/signup", {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: pw,
        })
        .then((response) => {
          window.alert("Inscription réussie ! Veuillez connecter.");
          navigate("/login");
        })
        .catch((error) => {
          window.alert("Inscription plantée !" + error.response.data.message);
        });
  };

  //Login function
  return (
    <div className="login">
      <Header />
      <div className="loginWrapper">
        <h1 className="loginTitle">Inscription</h1>
        <div className="loginTop">
          <form className="loginTop__info">
            <label className="loginTop__info--firstName">
              Prénom{" "}
              <input
                type="text"
                name="firstName"
                required
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              ></input>
            </label>
            <p id="firstNameErrorMsg"></p>
            <label className="loginTop__info--lastName">
              Nom{" "}
              <input
                type="text"
                name="lastName"
                required
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              ></input>
            </label>
            <p id="lastNameErrorMsg"></p>
            <label className="loginTop__info--email">
              Email{" "}
              <input
                type="email"
                name="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </label>
            <p id="emailErrorMsg"></p>
            <label className="loginTop__info--pw">
              Mot de passe{" "}
              <input
                type="password"
                name="password"
                required
                onChange={(e) => {
                  setPw(e.target.value);
                }}
              ></input>
            </label>
            <p id="passwordErrorMsg"></p>
          </form>
        </div>
        <div className="loginBottom">
          <button className="loginBottom__login" onClick={signup}>
            S'inscrire
          </button>
          <div className="loginBottom__prompt">Déjà un compte ?</div>
          <button
            className="loginBottom__signup"
            onClick={() => {
              navigate("/login");
            }}
          >
            Connectez-vous !
          </button>
        </div>
      </div>
    </div>
  );
}
