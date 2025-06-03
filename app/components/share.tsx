import React, { useContext, useEffect, useState } from "react";
import { PostType, UserType } from "../type";
import axios from "axios";
import { AuthContext } from "../state/AuthContext";
import dayjs from "dayjs";

const Share = ({ post }: { post: PostType }) => {
  const API_FOLDER = process.env.NEXT_PUBLIC_API_FOLDER;
  const { user } = useContext(AuthContext);
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [postUser, setPostUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchPostUser = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/user/${post.user_id}`
      );
      setPostUser(res.data[0]);
    };
    fetchPostUser();
  }, [post.user_id]);

  useEffect(() => {
    const fetchLikes = async () => {
      const res = await axios.post(
        `http://localhost:8000/api/post/likes/${post.id}`,
        { userId: user?.id }
      );
      setLikes(res.data.sum);
      setIsLiked(res.data.isLiked);
    };
    fetchLikes();
  }, [post.id, user?.id]);

  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:8000/api/post/likes`, {
        user_id: user?.id,
        post_id: post.id,
      });
      if (isLiked) {
        setLikes((prev) => prev - 1);
      } else {
        setLikes((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <div className="shareTopName">{postUser && postUser.username}</div>
          <div className="shareTopDate">
            {dayjs(post.created_at).format("YYYY-MM-DD HH:mm")}
          </div>
        </div>
        <div className="shareBody">
          <div className="shareBodyDesc">{post.body}</div>
          <img className="shareBodyImg" src={API_FOLDER + post.image} alt="" />
        </div>
        <div className="shareFooter">
          <div className="shareFooterLeft">
            <i
              style={{ color: "red" }}
              className="fa-solid fa-heart"
              onClick={handleLike}
            ></i>
            <div>{likes}人がいいねを押しました</div>
          </div>
          <div>:コメント</div>
        </div>
      </div>
    </div>
  );
};

export default Share;
