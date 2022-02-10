import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../profile/profile.css";
import Header from "../../components/header/Header";
import { useParams } from "react-router-dom";

export default function Profile() {
  let { id } = useParams();
  return (
    <div className="profile">
      <Header />
      <div className="profileWrapper">
        <div className="profileTop">
          <img
            className="profileTop__img"
            src={require("../../assets/profiles/1.png")}
            alt=""
          ></img>
          <FontAwesomeIcon icon={faImage} className="profileTop__icon" />
        </div>
        <div className="profileBottom">
          <form className="profileBottom__info">
            <label className="profileBottom__info--firstName">
              Prénom{" "}
              <input type="text" name="firstName" placeholder={id}></input>
            </label>
            <label className="profileBottom__info--lastName">
              Nom <input type="text" name="lastName" placeholder={id}></input>
            </label>
            <label className="profileBottom__info--email">
              Email <input type="text" name="email" placeholder={id}></input>
            </label>
          </form>
        </div>
        <button className="profileSave">Enregistrer</button>
        <button className="profileDelete">Supprimer le compte</button>
      </div>
    </div>
  );
}
