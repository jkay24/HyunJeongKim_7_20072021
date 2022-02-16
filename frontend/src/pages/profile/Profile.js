import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, createContext } from "react";
import "../profile/profile.css";
import Header from "../../components/header/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  let navigate = useNavigate();
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
        setLastname(res.data.lastname);
        setEmail(res.data.email);
        setImage(res.data.image);
      });
    }
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", image);
    axios
      .put("http://localhost:3000/api/user/update/${id}", data, {
        headers: {
          JWToken: sessionStorage.getItem("JWToken"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          setImage({ ...image, image: data });
          window.location.replace(`/user/${id}`);
        }
      });
  };

  return (
    <div className="profile">
      <Header />
      <div className="profileWrapper">
        <div className="profileTop">
          <img
            className="profileTop__img"
            src={
              image ||
              require("http://localhost:3000/images/default-avatar.png")
            }
            alt="profile pic"
          ></img>
          <FontAwesomeIcon
            icon={faImage}
            className="profileTop__icon"
            onClick={handleUpload}
          />
        </div>
        <div className="profileBottom">
          <form className="profileBottom__info">
            <label className="profileBottom__info--firstName">
              Prénom{" "}
              <input
                type="text"
                name="firstName"
                placeholder={firstname}
              ></input>
            </label>
            <label className="profileBottom__info--lastName">
              Nom{" "}
              <input type="text" name="lastName" placeholder={lastname}></input>
            </label>
            <label className="profileBottom__info--email">
              Email <input type="text" name="email" placeholder={email}></input>
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
