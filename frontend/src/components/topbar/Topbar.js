import "../topbar/topbar.css";
import { faSignOutAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
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
          <img
            src={require("../../assets/profiles/1.png")}
            alt="photo de profil"
            className="topbarRight__profile--img"
          ></img>
          <div className="topbarRight__profile--name">User 1</div>
        </div>
        <div className="topbarRight__links">
          <a
            onClick={() => {
              navigate("/profile");
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
