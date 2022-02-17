import "../post/post.css";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post() {
  const { user } = useContext(AuthContext);
  let { id } = useParams();
  let navigate = useNavigate();
  const [posts, setPost] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState();
  useEffect(() => {
    if (!sessionStorage.getItem("JWToken")) {
      navigate("/");
    } else {
      const fetchPosts = async () => {
        const res = await axios.get("http://localhost:3000/api/post/${id}", {
          headers: {
            JWToken: sessionStorage.getItem("JWToken"),
          },
        });
        setPost(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      };
      fetchPosts().then((res) => {
        setPost(res.data.post);
      });
    }
  }, []);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <img
            className="postTop__img"
            src={image || "http://localhost:3000/images/default-avatar.png"}
            alt=""
          ></img>
          <span className="postTop__user">User</span>
          <span className="postTop__postDate"></span>
        </div>
        <div className="postCenter">
          <span className="postCenter__text"></span>
          <img className="postCenter__img" src="" alt="" />
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
    </div>
  );
}
