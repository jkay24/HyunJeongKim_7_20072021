import "../topbar/topbar.css";
import { faSignOutAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  let navigate = useNavigate();
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

  const logOut = (e) => {
    localStorage.clear();
    navigate(`/signup`);
    window.location.reload();
  };

  return (
    <header className="topbarContainer">
      <div className="topbar__logo">
        <img
          src={require("../../assets/logos/logo-aligned.svg").default}
          alt="Groupomania logo"
        ></img>
      </div>
      <div className="topbarRight" tabIndex="1">
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
              title="modifier le profil"
              tabIndex="0"
              className="topbarRight__links__icons--edit"
            />
            Modifier
          </a>
          <a
            onClick={() => {
              logOut();
            }}
          >
            <FontAwesomeIcon
              icon={faSignOutAlt}
              title="deconnecter"
              tabIndex="0"
              className="topbarRight__links__icons--logout"
            />
            Déconnexion
          </a>
        </div>
      </div>
    </header>
  );
}
