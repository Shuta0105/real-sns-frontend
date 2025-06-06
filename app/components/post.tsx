import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../state/AuthContext";
import Image from "next/image";

const Post = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { user } = useContext(AuthContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [profile, setProfile] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let postInfo;
    if (inputRef.current) {
      postInfo = {
        user_id: user?.id,
        body: inputRef.current.value,
        image: "",
      };
    }

    if (file) {
      const fileData = new FormData();
      const fileName = Date.now() + file.name;
      fileData.append("name", fileName);
      fileData.append("file", file);
      if (postInfo) {
        postInfo.image = fileName;
      }

      try {
        await axios.post(`${API_URL}/api/upload`, fileData);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await axios.post(`${API_URL}/api/post`, postInfo);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.profile) {
      setProfile(user.profile);
    }
  }, [user]);

  return (
    <div className="post">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="postInputWrapper">
          <Image
            src={
              profile ||
              "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png"
            }
            width={50}
            height={50}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
            }}
            alt=""
          />
          <input
            className="postInput"
            type="text"
            placeholder="投稿をシェア"
            ref={inputRef}
          />
        </div>
        <hr className="postHr" />
        <div className="postBottom">
          <div className="postIcons">
            <label className="postIcon" htmlFor="file">
              <i style={{ color: "blue" }} className="fa-solid fa-image"></i>
              <div className="postIconTag">写真</div>
              <input
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>
          <button type="submit" className="postButton">
            投稿
          </button>
        </div>
      </form>
    </div>
  );
};

export default Post;
