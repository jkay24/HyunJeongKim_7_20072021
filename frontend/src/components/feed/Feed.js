import "./feed.scss";
import Share from "../share/Share";
import Post from "../post/Post";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

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
  }, []);

  return profileData;
};

export default function Feed() {
  const [listOfPosts, setlistOfPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const profileData = useProfileData(user);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`http://localhost:3000/api/post/`, {
        headers: {
          JWToken: user.token,
        },
      });
      setlistOfPosts(
        res.data.listOfPosts.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, []);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share profileData={profileData} />
        <>
          <div className="title">Publications récentes</div>
          <hr />
          {listOfPosts?.map((post) => {
            return (
              <Post
                key={post.id}
                id={post.id}
                authorFirstname={post.authorFirstname}
                authorId={post.authorId}
                createdAt={post.createdAt}
                content={post.content}
                image={post.image}
              />
            );
          })}
        </>
      </div>
    </div>
  );
}
