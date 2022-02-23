import { faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useContext } from "react";
import "../profile/profile.css";
import Header from "../../components/header/Header";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  let navigate = useNavigate();
  let { id: userId } = useParams();
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({});
  const [image, setImage] = useState("");
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

  //Update information (firstname, lastname, email)
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  //Form input validation
  const regExNames = (value) => {
    return /^[a-zA-Z\s]{2,20}$/.test(value);
  };
  const textAlert = (value) => {
    return `Veuillez saisir un ${value} valide entre 2 à 20 lettres, sans chiffre ni symbole.`;
  };

  const regExEmail = (value) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  };

  function formValidationFirstName() {
    const isCorrect = regExNames(firstname);
    document.getElementById("firstNameErrorMsg").innerHTML = isCorrect
      ? ""
      : textAlert("prénom");
    return isCorrect;
  }
  function formValidationLastName() {
    const isCorrect = regExNames(lastname);
    document.getElementById("lastNameErrorMsg").innerHTML = isCorrect
      ? ""
      : textAlert("nom");
    return isCorrect;
  }
  function formValidationEmail() {
    const isCorrect = regExEmail(email);
    document.getElementById("emailErrorMsg").innerHTML = isCorrect
      ? ""
      : "Veuillez saisir une adresse mail valide.";
    return isCorrect;
  }

  const updateInfo = () => {
    const data = new FormData();
    data.append("image", image);
    data.append("firstname", firstname);
    data.append("lastname", lastname);
    data.append("email", email);
    if (
      formValidationFirstName() &&
      formValidationLastName() &&
      formValidationEmail()
    )
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
            setEmail({ ...email, email: email });
            setLastname({ ...lastname, lastname: lastname });
            setFirstname({ ...firstname, firstname: firstname });
            setImage(res.data);
            window.alert("Modifications bien sauvegardées !");
            window.location.replace(`/profile/${userId}`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
  };

  //Delete user account
  const handleDelete = () => {
    if (!window.confirm(`Voulez-vous vraiment supprimer votre compte ?`))
      return;
    axios
      .delete(`http://localhost:3000/api/user/delete/${userId}`, {
        headers: {
          JWToken: user.token,
        },
      })
      .then(() => {
        localStorage.clear();
        navigate(`/signup`);
        window.location.reload();
        localStorage.clear();
      });
  };

  const [imageName, setImageName] = useState("");
  const [imageAdded, setImageAdded] = useState(false);
  const imageAddedToPost = (e) => {
    setImageName(e.target.value.slice(12));
    setImage(e.target.files[0]);
    setImageAdded(true);
  };

  return (
    <div className="profile">
      <Header />
      <div className="profileWrapper">
        <Link to="/home">
          <FontAwesomeIcon
            icon={faTimes}
            className="profileClose"
            title="close this page"
          />
        </Link>
        <h1 className="profileTitle">Modifiez votre profil</h1>
        <div className="formWrapper">
          <form className="profileTop">
            <label htmlFor="image" className="profileTop__upload">
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
                onInput={imageAddedToPost}
                aria-label="modifier votre image"
              />
              <FontAwesomeIcon icon={faImage} className="profileTop__icon" />{" "}
              <div className="image__name">{imageName}</div>
            </label>

            <label className="profileBottom__info--firstName">
              Prénom{" "}
              <input
                type="text"
                name="firstname"
                placeholder={profileData.firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              ></input>
            </label>
            <p id="firstNameErrorMsg"></p>
            <label className="profileBottom__info--lastName">
              Nom{" "}
              <input
                type="text"
                name="lastname"
                placeholder={profileData.lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              ></input>
            </label>
            <p id="lastNameErrorMsg"></p>
            <label className="profileBottom__info--email">
              Email{" "}
              <input
                type="text"
                name="email"
                placeholder={profileData.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </label>
            <p id="emailErrorMsg"></p>
          </form>
        </div>
        <div className="profileButtons">
          <button className="profileSave" onClick={updateInfo}>
            Enregistrer
          </button>
          <button className="profileDelete" onClick={handleDelete}>
            Supprimer le compte
          </button>
        </div>
      </div>
    </div>
  );
}
