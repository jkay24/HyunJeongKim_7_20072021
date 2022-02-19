import "../post/post.css";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/fr";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

export default function Post() {
  let navigate = useNavigate();
  const [listOfPosts, setListOfPosts] = useState([]);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState();
  const { user } = useContext(AuthContext);
  let userId = JSON.parse(localStorage.getItem("user")).id;
  const [profileData, setProfileData] = useState({});
  const formatter = buildFormatter(frenchStrings);
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
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`http://localhost:3000/api/post/`, {
        headers: {
          JWToken: user.token,
        },
      });
      setListOfPosts(res.data);
    };
    fetchPosts();
  }, []);
  return (
    <>
      <div className="title">Publications récentes</div>
      <hr />
      <div className="post">
        {Object.values(listOfPosts).map((value, key) => {
          return (
            <div className="postWrapper" key={key}>
              <div className="postTop">
                <img
                  className="postTop__img"
                  src={
                    value[key].profilePic ||
                    "http://localhost:3000/images/default-avatar.png"
                  }
                  alt=""
                ></img>
                <span className="postTop__user">{value[key].firstname}</span>
                <span className="postTop__postDate">
                  <TimeAgo date={value[key].createdAt} formatter={formatter} />
                </span>
              </div>
              <div className="postCenter">
                <span className="postCenter__text">{value[key].content}</span>
                {value[key].image && (
                  <>
                    <img
                      className="postCenter__img"
                      src={value[key].image}
                      alt="illustration du post"
                    />
                  </>
                )}
              </div>
              <div className="postBottom">
                <div className="postBottom__like">
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    className="postBottom__like--icon"
                    // onClick={this.likeHandler}
                  />
                  <span className="postBottom__like--counter">2</span>
                </div>
                <span className="postBottom__noComments">0 commentaires</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
