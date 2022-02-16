import "../post/post.css";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { format } from "timeago.js";

export default function Post() {
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [image, setImage] = useState("");
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
        setImage(res.data.image);
      });
    }
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem("JWToken")) {
      navigate("/");
    } else {
      const fetchPosts = async () => {
        const res = await axios.get("http://localhost:3000/api/post", {
          headers: {
            JWToken: sessionStorage.getItem("JWToken"),
          },
        });
        setPosts(res.data);
      };
      fetchPosts().then((res) => {
        setPosts(res.data.post);
      });
    }
  }, []);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          {/* <Link to={"/profile/:id"}> */}
          <img
            className="postTop__img"
            src={
              image ||
              require("http://localhost:3000/images/default-avatar.png")
            }
            alt=""
          ></img>
          {/*  </Link> */}
          <span className="postTop__user">{firstname}</span>
          <span className="postTop__postDate">il y a 5 mins</span>
        </div>
        {posts.map((p) => (
          <>
            <Post key={p.id} post={p} />
            <div className="postCenter">
              <span className="postCenter__text">{p}</span>
              <img className="postCenter__img" src={p} alt="" />
            </div>
          </>
        ))}
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
