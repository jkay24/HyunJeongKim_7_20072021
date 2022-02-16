import "../topbar/topbar.css";
import { faSignOutAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);

  let navigate = useNavigate();
  let { id } = useParams();
  /* const Navigatehere = () => {
    console.log(`/profile/{$id}`);
    navigate(`/profile/5`);
  }; */
  const [firstname, setFirstname] = useState("");
  const [image, setImage] = useState("");
  useEffect(() => {
    if (!sessionStorage.getItem("JWToken")) {
      navigate("/login");
    } else {
      const fetchUserProfile = async () => {
        const res = await axios.get("http://localhost:3000/api/user/${id}", {
          headers: {
            JWToken: sessionStorage.getItem("JWToken"),
          },
        });
        console.log(res);
      };
      fetchUserProfile().then((res) => {
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
            src={image || require("../../assets/profiles/default-avatar.png")}
            alt="photo de profil"
            className="topbarRight__profile--img"
          ></img>
          <div className="topbarRight__profile--name">{firstname}</div>
        </div>
        <div className="topbarRight__links">
          <a
            onClick={() => {
              navigate("/profile/{$id}");
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
