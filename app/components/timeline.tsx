import React, { useContext, useEffect, useState } from "react";
import Post from "./post";
import Share from "./share";
import axios from "axios";
import { PostType } from "../type";
import { AuthContext } from "../state/AuthContext";
import "./toggle.css";

const TimeLine = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const [allPosts, setAllPosts] = useState<PostType[] | null>(null);
  const [toggle, setToggle] = useState("");

  useEffect(() => {
    const fetchTimelineForFollowing = async () => {
      const res = await axios.get(`${API_URL}/api/post/timeline/${user?.id}`);
      setPosts(
        res.data.sort((post1: PostType, post2: PostType) => {
          return (
            new Date(post2.created_at).getTime() -
            new Date(post1.created_at).getTime()
          );
        })
      );
    };
    fetchTimelineForFollowing();

    const fetchTimelineForAll = async () => {
      const res = await axios.get(`${API_URL}/api/post/all`);
      setAllPosts(
        res.data.sort((post1: PostType, post2: PostType) => {
          return (
            new Date(post2.created_at).getTime() -
            new Date(post1.created_at).getTime()
          );
        })
      );
    };
    fetchTimelineForAll();
  }, [user?.id]);

  const renderPosts = toggle === "forYou" ? allPosts : posts;

  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Post />
        <div className="toggle">
          <div className="toggleWrapper">
            <button
              className={`toggleButton ${toggle === "forYou" ? "active" : ""}`}
              onClick={() => setToggle("forYou")}
            >
              For you
            </button>
            <button
              className={`toggleButton ${toggle === "following" ? "active" : ""}`}
              onClick={() => setToggle("following")}
            >
              Following
            </button>
          </div>
        </div>
        {renderPosts &&
          renderPosts.map((post) => <Share key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default TimeLine;
