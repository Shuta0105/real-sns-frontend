import React, { useContext, useEffect, useState } from "react";
import Post from "./post";
import Share from "./share";
import axios from "axios";
import { PostType } from "../type";
import { AuthContext } from "../state/AuthContext";

const TimeLine = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<PostType[] | null>(null);

  useEffect(() => {
    const fetchTimeline = async () => {
      const res = await axios.get(
        `${API_URL}/api/post/timeline/${user?.id}`
      );
      setPosts(res.data.sort((post1: PostType, post2: PostType) => {
        return new Date(post2.created_at).getTime() - new Date(post1.created_at).getTime();
      }));
    };
    fetchTimeline();
  }, [user?.id]);

  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Post />
        {posts && posts.map((post) => <Share key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default TimeLine;
