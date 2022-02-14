import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "../profile/profile.css";
import Header from "../../components/header/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  let navigate = useNavigate();
  let { id } = useParams();
  useEffect(() => {
    if (!sessionStorage.getItem("JWToken")) {
      navigate("/home");
    } else {
      axios
        .get("http://localhost:3000/api/user/${id}", {
          headers: {
            JWToken: sessionStorage.getItem("JWToken"),
          },
        })
        .then((res) => {
          setFirstname(res.data.firstname);
          setLastname(res.data.lastname);
          setEmail(res.data.email);
          setImage(res.data.image);
        });
    }
  }, []);
  return (
    <div className="profile">
      <Header />
      <div className="profileWrapper">
        <div className="profileTop">
          <img className="profileTop__img" src={image} alt="profile pic"></img>
          <FontAwesomeIcon icon={faImage} className="profileTop__icon" />
        </div>
        <div className="profileBottom">
          <form className="profileBottom__info">
            <label className="profileBottom__info--firstName">
              Prénom{" "}
              <input
                type="text"
                name="firstName"
                placeholder={firstname}
              ></input>
            </label>
            <label className="profileBottom__info--lastName">
              Nom{" "}
              <input type="text" name="lastName" placeholder={lastname}></input>
            </label>
            <label className="profileBottom__info--email">
              Email <input type="text" name="email" placeholder={email}></input>
            </label>
          </form>
        </div>
        <button className="profileSave">Enregistrer</button>
        <button className="profileDelete">Supprimer le compte</button>
      </div>
    </div>
  );
}
