import "./feed.scss";
import Share from "../share/Share";
import Post from "../post/Post";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed() {
  /*  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  let userId = JSON.parse(localStorage.getItem("user")).id;
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`http://localhost:3000/api/post/`, {
        headers: {
          JWToken: user.token,
        },
      });
      setPosts(res.data.posts);
      console.log(res.data);
      console.log(posts);
    };
    fetchPosts();
  }, [userId]); */
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        <Post />
        {/*   {posts.map((p) => (
          <Post key={p.id} post={p} />
        ))} */}
      </div>
    </div>
  );
}
