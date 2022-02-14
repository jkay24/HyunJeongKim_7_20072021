import "../topbar/topbar.css";
import { faSignOutAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function Topbar() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [image, setImage] = useState("");
  useEffect(() => {
    if (!sessionStorage.getItem("JWToken")) {
      window.location.replace(`/`);
    } else {
      Axios.get("http://localhost:3000/api/user/${id}", {
        headers: {
          JWToken: sessionStorage.getItem("JWToken"),
        },
      }).then((res) => {
        setFirstname(res.data.firstname);
        setImage(res.data.image);
      });
    }
  }, []);
  return (
    <div className="topbarContainer">
      <div className="topbar__logo">
        <img
          src={require("../../assets/logos/logo-aligned.svg").default}
          alt="Groupomania logo"
        ></img>
      </div>
      <div className="topbarRight">
        <div className="topbarRight__profile">
          <img
            src={require("../../assets/profiles/1.png")}
            alt="photo de profil"
            className="topbarRight__profile--img"
          ></img>
          <div className="topbarRight__profile--name">{firstname}</div>
        </div>
        <div className="topbarRight__links">
          <a
            onClick={() => {
              navigate("/profile/${id}");
            }}
          >
            <FontAwesomeIcon
              icon={faUserEdit}
              className="topbarRight__links__icons--edit"
            />
            Modifier
          </a>
          <a
            onClick={() => {
              navigate("/login");
            }}
          >
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="topbarRight__links__icons--logout"
            />
            Déconnexion
          </a>
        </div>
      </div>
    </div>
  );
}
