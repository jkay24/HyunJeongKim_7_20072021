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
    /* console.log(document.getElementById("image"));
    data.append("image", document.getElementById("image").files[0]); */
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
        } else {
          /* window.location.reload(); */
          console.log("successfully shared a post!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <form className="shareTop" onSubmit={submitHandler}>
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
        {/*  {image && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <span className="shareCancelImg" onClick={() => setImage(null)} />
          </div>
        )} */}
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
