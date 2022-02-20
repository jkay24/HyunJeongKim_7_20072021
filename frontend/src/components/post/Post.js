import "../post/post.css";
import { faThumbsUp, faTrash } from "@fortawesome/free-solid-svg-icons";
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

export default function Post({ firstname, createdAt, content, image }) {
  const { user } = useContext(AuthContext);
  const formatter = buildFormatter(frenchStrings);
  const profileData = useProfileData(user);
  console.log(user);
  /* let navigate = useNavigate();
  const deletePost = (user) => {
    axios
      .delete(`http://localhost:3000/api/post/delete/${userId}`, {
        headers: {
          JWToken: user.token,
        },
      })
      .then(() => {
        navigate("/");
      });
  }; */
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <img
            className="postTop__img"
            src={profileData.profilePic || defaultAvatar}
            alt=""
          ></img>
          <span className="postTop__user">{firstname}</span>
          <span className="postTop__postDate">
            <TimeAgo date={createdAt} formatter={formatter} />
          </span>
          {user.id === firstname && (
            <>
              <div className="postTop__delete">
                <FontAwesomeIcon
                  icon={faTrash}
                  className="postTop__delete--icon"
                  /*onClick={() => {
            deletePost(id);
          }}*/
                />
              </div>
            </>
          )}
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
        {/* <div className="postBottom">
          <div className="postBottom__like">
            <FontAwesomeIcon
              icon={faThumbsUp}
              className="postBottom__like--icon"
            />
            <span className="postBottom__like--counter">2</span>
            <span className="postBottom__noComments">0 commentaires</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}
