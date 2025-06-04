"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../state/AuthContext";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import Image from "next/image";

const Topbar = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header>
      <div className="headerWrapper">
        <h2 className="headerTitle">Real SNS</h2>
        <div className="headerRight">
          {isClient && user && (
            <div className="headerRightUser">
              <Image
                src={
                  user.profile ||
                  "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png"
                }
                width={40}
                height={40}
                className="headerUserIcon"
                alt=""
              />
              <span className="headerRightUserName">{user.username}</span>
            </div>
          )}
          <button
            className="registerButton"
            onClick={() => router.push("/login")}
          >
            ログイン
          </button>
          <button
            className="registerButton"
            onClick={() => router.push("/register")}
          >
            新規登録
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
