import "../topbar/topbar.css";
import { faSignOutAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  let userId = JSON.parse(localStorage.getItem("user")).id;
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    const fetchUserProfile = async () => {
      const res = await axios.get(`http://localhost:3000/api/user/${userId}`, {
        headers: {
          JWToken: user.token,
        },
      });
      setProfileData(res.data);
    };
    fetchUserProfile();
  }, [userId]);
  let navigate = useNavigate();
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
          <a className="topbarRight__profile--name">{profileData.firstname}</a>
          <img
            src={
              profileData.profilePic
                ? profileData.profilePic
                : "http://localhost:3000/images/default-avatar.png"
            }
            alt="photo de profil"
            className="topbarRight__profile--img"
          ></img>
        </div>
        <div className="topbarRight__links">
          <a
            onClick={() => {
              navigate(`/profile/` + userId);
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
