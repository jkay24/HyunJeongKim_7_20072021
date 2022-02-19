import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useContext } from "react";
import "../profile/profile.css";
import Header from "../../components/header/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  let { id: userId } = useParams();
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({});
  const [image, setImage] = useState("");
  console.log(profileData);
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
  const handleUpload = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", image);
    axios
      .put(`http://localhost:3000/api/user/update/${userId}`, data, {
        headers: {
          JWToken: user.token,
        },
      })
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          setImage(res.data);
          window.location.replace(`/profile/${userId}`);
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
              profileData.profilePic ||
              "http://localhost:3000/images/default-avatar.png"
            }
            alt="profile pic"
          ></img>

          <input
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
                placeholder={profileData.firstname}
              ></input>
            </label>
            <label className="profileBottom__info--lastName">
              Nom{" "}
              <input
                type="text"
                name="lastName"
                placeholder={profileData.lastname}
              ></input>
            </label>
            <label className="profileBottom__info--email">
              Email{" "}
              <input
                type="text"
                name="email"
                placeholder={profileData.email}
              ></input>
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
