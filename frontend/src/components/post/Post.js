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

export default function Post(post) {
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);
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
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`http://localhost:3000/api/post/`, {
        headers: {
          JWToken: user.token,
        },
      });
      setPosts(res.data);
    };
    fetchPosts();
  }, [post.id]);
  console.log(posts);
  return (
    <>
      <div className="title">Publications récentes</div>
      <hr />
      <div className="post">
        {Object.values(posts).map((post, i) => {
          return (
            <div className="postWrapper" key={post[i].id}>
              <div className="postTop">
                <img
                  className="postTop__img"
                  src={
                    post[i].profilePic ||
                    "http://localhost:3000/images/default-avatar.png"
                  }
                  alt=""
                ></img>
                <span className="postTop__user">{post[i].firstname}</span>
                <span className="postTop__postDate">
                  <TimeAgo date={post[i].createdAt} formatter={formatter} />
                </span>
              </div>
              <div className="postCenter">
                <span className="postCenter__text">{post[i].content}</span>
                {post[i].image && (
                  <>
                    <img
                      className="postCenter__img"
                      src={post[i].image}
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
                    </div>
                    <span className="postBottom__noComments">0 commentaires</span>
                  </div> */}
            </div>
          );
        })}
      </div>
    </>
  );
}
