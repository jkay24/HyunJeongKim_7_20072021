import "./share.css";
import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Share({ profileData }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const { user } = useContext(AuthContext);
  const defaultAvatar = "http://localhost:3000/images/default-avatar.png";
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("content", content);
    data.append("image", image);
    await axios
      .post(`http://localhost:3000/api/post`, data, {
        headers: {
          JWToken: user.token,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          console.log(res.data.error);
          /* Figure out why backend allows for publication of nothing upon click
          window.alert("Non publiée..." + res.data.error.message); */
        } else {
          window.location.reload();
        }
      })
      .catch((error) => {
        window.alert("Non publiée..." + error.response.data.message);
      });
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <form className="shareTop">
          <img
            src={profileData.profilePic || defaultAvatar}
            alt="photo de profil"
            className="shareTop__img"
          ></img>
          <input
            name="content"
            id="content"
            type="text"
            className="shareTop__input"
            placeholder={`Quoi de neuf, ${profileData.firstname}?`}
            aria-label="quoi de neuf"
            onChange={(e) => setContent(e.target.value)}
          ></input>
        </form>
        <hr className="shareHr" />
        <form className="shareBottom">
          <label htmlFor="image" className="shareBottom__upload">
            <FontAwesomeIcon
              icon={faPhotoVideo}
              className="shareBottom__upload__icon"
            />
            Photo/video
            <input
              style={{ display: "none" }}
              type="file"
              id="image"
              name="image"
              accept=".jpeg, .jpg, .png, .gif, .webp"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <button
            className="shareBottom__submit"
            type="button"
            aria-label="valider"
            onClick={submitHandler}
          >
            Publier
          </button>
        </form>
      </div>
    </div>
  );
}
