import "../post/post.css";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
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

  //The below function automatically updates the post author's firstname in case the user changed his/her name (could use localStorage value otherwise)
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

  //Conditional rendering of delete icons
  function isToDeletePost(admin, userId, authorId) {
    return admin || userId == authorId;
  }

  //Show names of uploaded images
  const [imageName, setImageName] = useState("");
  const [imageAdded, setImageAdded] = useState(false);
  const imageAddedToPost = (e) => {
    setImageName(e.target.value.slice(12));
    setNewImage(e.target.files[0]);
    setImageAdded(true);
  };

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
            <TimeAgo date={createdAt} formatter={formatter} />
          </span>
          {isToDeletePost(user.admin, userId, authorId) && (
            <div className="postTop__delete">
              <FontAwesomeIcon
                icon={faTrash}
                title="supprimer le post"
                tabIndex="0"
                className="postTop__delete--icon"
                onClick={() => {
                  deletePostHandler(id);
                }}
              />
            </div>
          )}
        </div>
        {userId && (
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
        )}
        <div className="postBottom">
          {userId == authorId && (
            <>
              <form className="postBottom__edit">
                <input
                  name="content"
                  id="content"
                  type="text"
                  className="postBottom__edit--input"
                  placeholder="Modifiez votre publication"
                  aria-label="modifiez le texte de votre publication"
                  onChange={(e) => setNewContent(e.target.value)}
                ></input>
                <div className="postBottom__edit--upload">
                  <input
                    type="file"
                    id="newImage"
                    name="newImage"
                    accept=".jpeg, .jpg, .png, .gif, .webp"
                    aria-label="ajoutez une image"
                    onInput={imageAddedToPost}
                  />
                </div>
                <FontAwesomeIcon
                  icon={faPen}
                  className="postBottom__edit--icon2"
                  title="valider la modification du post"
                  tabIndex="0"
                  aria-label="valider"
                  onClick={editPostHandler}
                />
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
