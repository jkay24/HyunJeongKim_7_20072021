import "../post/post.css";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Post() {
  let navigate = useNavigate();
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  useEffect(() => {
    if (!sessionStorage.getItem("JWToken")) {
      navigate("/");
    } else {
      Axios.get("http://localhost:3000/api/post", {
        headers: {
          JWToken: sessionStorage.getItem("JWToken"),
        },
      }).then((res) => {
        setListOfPosts(res.data.listOfPosts);
        setLikedPosts(
          res.data.likedPosts.map((like) => {
            return like.PostId;
          })
        );
      });
    }
  }, []);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <img
            className="postTop__img"
            src={require("../../assets/profiles/1.png")}
            alt=""
          ></img>
          <span className="postTop__user">User 1</span>
          <span className="postTop__postDate">il y a 5 mins</span>
        </div>
        {/*  {listOfPosts.map((value, key) => {
            return (
              <div className="postCenter" key={key}>
                <span className="postCenter__text">{value.content}</span>
                <img className="postCenter__img" src={value.image} alt="" />      
              </div> )}} */}
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
