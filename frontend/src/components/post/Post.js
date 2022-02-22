import "../post/post.css";
import {
  faPen,
  faThumbsUp,
  faTrash,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/fr";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

const defaultAvatar = "http://localhost:3000/images/default-avatar.png";
const useProfileData = (user) => {
  const [profileData, setProfileData] = useState({});
  let userId = JSON.parse(localStorage.getItem("user")).id;
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

  return profileData;
};

export default function Post({
  id,
  authorFirstname,
  authorId,
  createdAt,
  updatedAt,
  content,
  image,
}) {
  const { user } = useContext(AuthContext);
  const formatter = buildFormatter(frenchStrings);
  const [imgSrc, setImgSrc] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newFirstname, setNewFirstname] = useState("");
  let userId = JSON.parse(localStorage.getItem("user")).id;
  const deletePostHandler = (id) => {
    axios
      .delete(`http://localhost:3000/api/post/delete/${id}`, {
        headers: {
          JWToken: user.token,
        },
      })
      .then(() => {
        window.location.reload();
      });
  };

  //@HELP - new image upload not being recognized in request to backend...?!
  const editPostHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("content", newContent);
    data.append("image", newImage);
    await axios
      .put(`http://localhost:3000/api/post/update/${id}`, data, {
        headers: {
          JWToken: user.token,
        },
      })
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAvatarOfPoster = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/user/${authorId}`,
        {
          headers: {
            JWToken: user.token,
          },
        }
      );
      setImgSrc(res.data.profilePic);
    } catch (err) {
      throw err;
    }
  };
  fetchAvatarOfPoster();

  //The below function automatically updates the post author's firstname in case the user changed his/her name
  const fetchNewFirstname = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/user/${authorId}`,
        {
          headers: {
            JWToken: user.token,
          },
        }
      );
      setNewFirstname(res.data.firstname);
    } catch (err) {
      throw err;
    }
  };
  fetchNewFirstname();

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <img
            className="postTop__img"
            src={imgSrc || defaultAvatar}
            alt="photo d'auteur de post"
          ></img>
          <span className="postTop__user">{newFirstname}</span>
          <span className="postTop__postDate">
            {/* @ Is there a way to show the time as of updatedAt IF post was edited? */}
            <TimeAgo date={createdAt || updatedAt} formatter={formatter} />
          </span>
          {userId == authorId ||
            (user.admin === true && (
              <div className="postTop__delete">
                <FontAwesomeIcon
                  icon={faTrash}
                  className="postTop__delete--icon"
                  onClick={() => {
                    deletePostHandler(id);
                  }}
                />
              </div>
            ))}
        </div>
        <div className="postCenter">
          <span className="postCenter__text">{content}</span>
          {image && (
            <>
              <img
                className="postCenter__img"
                src={image}
                alt="illustration du post"
              />
            </>
          )}
        </div>
        <div className="postBottom">
          {userId == authorId ||
            (user.admin === true && (
              <>
                <form className="postBottom__edit">
                  <input
                    name="content"
                    id="content"
                    type="text"
                    className="postBottom__edit--input"
                    placeholder="Modifiez votre publication"
                    aria-label="modifier votre publication"
                    onChange={(e) => setNewContent(e.target.value)}
                  ></input>
                  <label htmlFor="image" className="postBottom__edit--upload">
                    <FontAwesomeIcon
                      icon={faLink}
                      className="postBottom__edit--icon1"
                    />
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="image"
                      name="image"
                      accept=".jpeg, .jpg, .png, .gif, .webp"
                      onChange={(e) => setNewImage(e.target.files[0])}
                    />
                  </label>
                  <FontAwesomeIcon
                    icon={faPen}
                    className="postBottom__edit--icon2"
                    onClick={editPostHandler}
                  />
                </form>
              </>
            ))}
          {/* <div className="postBottom__like">
            <FontAwesomeIcon
              icon={faThumbsUp}
              className="postBottom__like--icon"
            />
            <span className="postBottom__like--counter">2</span>
            <span className="postBottom__noComments">0 commentaires</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
