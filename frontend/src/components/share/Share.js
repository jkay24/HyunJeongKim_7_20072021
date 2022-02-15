import "./share.css";
import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Share() {
  let navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [image, setImage] = useState("");
  let { id } = useParams();
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
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={image || require("../../assets/profiles/default-avatar.png")}
            alt="photo de profil"
            className="shareTop__img"
          ></img>
          <input
            type="text"
            className="shareTop__input"
            placeholder="Dis-nous {firstname} !"
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
