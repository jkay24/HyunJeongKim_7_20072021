import "./share.css";
import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Share() {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={require("../../assets/profiles/1.png")}
            alt="photo de profil"
            className="shareTop__img"
          ></img>
          <input
            type="text"
            className="shareTop__input"
            placeholder="Dis-nous, User 1 !"
          ></input>
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareBottom__upload">
            <FontAwesomeIcon
              icon={faPhotoVideo}
              className="shareBottom__upload__icon"
            />
            Photo/video
          </div>
          <button className="shareBottom__submit">Publier</button>
        </div>
      </div>
    </div>
  );
}
