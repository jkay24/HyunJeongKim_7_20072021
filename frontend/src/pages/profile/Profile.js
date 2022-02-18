import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, createContext } from "react";
import "../profile/profile.css";
import Header from "../../components/header/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  let { id } = useParams();
  const [user, setUser] = useState({});
  const [image, setImage] = useState("");
  const userId = useParams().id;
  let navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("JWToken")) {
      navigate("/login");
    } else {
      const fetchUserProfile = async () => {
        const res = await axios.get(`http://localhost:3000/api/user/${id}`, {
          headers: {
            JWToken: sessionStorage.getItem("JWToken"),
          },
        });
        setUser(res.data);
      };
      fetchUserProfile();
    }
  }, [userId]);
  const handleUpload = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", image);
    axios
      .put(`http://localhost:3000/api/user/update/${id}`, data, {
        headers: {
          JWToken: sessionStorage.getItem("JWToken"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          setImage({ ...image, image: data });
          window.location.replace(`/profile/${id}`);
        }
      });
  };

  return (
    <div className="profile">
      <Header />
      <div className="profileWrapper">
        <form className="profileTop">
          <img
            className="profileTop__img"
            src={
              user.profilePic ||
              "http://localhost:3000/images/default-avatar.png"
            }
            alt="profile pic"
          ></img>
          <input
            style={{ display: "none" }}
            type="file"
            id="image"
            name="image"
            accept=".jpeg, .jpg, .png, .gif, .webp"
            onChange={(e) => setImage(e.target.files[0])}
            aria-label="modifier votre image"
          />
          <FontAwesomeIcon
            icon={faImage}
            className="profileTop__icon"
            onClick={handleUpload}
          />
        </form>
        <div className="profileBottom">
          <form className="profileBottom__info">
            <label className="profileBottom__info--firstName">
              Prénom{" "}
              <input
                type="text"
                name="firstName"
                placeholder={user.firstname}
              ></input>
            </label>
            <label className="profileBottom__info--lastName">
              Nom{" "}
              <input
                type="text"
                name="lastName"
                placeholder={user.lastname}
              ></input>
            </label>
            <label className="profileBottom__info--email">
              Email{" "}
              <input type="text" name="email" placeholder={user.email}></input>
            </label>
          </form>
        </div>
        <div className="profileButtons">
          <button className="profileSave">Enregistrer</button>
          <button className="profileDelete">Supprimer le compte</button>
        </div>
      </div>
    </div>
  );
}
