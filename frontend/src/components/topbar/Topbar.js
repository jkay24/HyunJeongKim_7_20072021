import "../topbar/topbar.css";
import { faSignOutAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const [user, setUser] = useState({});
  const id = JSON.parse(localStorage.getItem("user")).id;
  let navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("JWToken")) {
      navigate("/login");
    } else {
      const fetchUserProfile = async () => {
        const res = await axios.get(`http://localhost:3000/api/user/` + id, {
          headers: {
            JWToken: sessionStorage.getItem("JWToken"),
          },
        });
        setUser(res.data);
      };
      fetchUserProfile();
    }
  }, [id]);
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
            src={
              user.profilePic
                ? user.profilePic
                : "http://localhost:3000/images/default-avatar.png"
            }
            alt="photo de profil"
            className="topbarRight__profile--img"
          ></img>
          <div className="topbarRight__profile--name">{user.firstname}</div>
        </div>
        <div className="topbarRight__links">
          <a
            onClick={() => {
              navigate(`/profile/` + id);
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
              navigate(`/login`);
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
