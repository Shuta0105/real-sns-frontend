"use client";

import React from "react";
import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let userInfo;
    if (usernameRef.current && emailRef.current && passwordRef.current) {
      userInfo = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/register",
        userInfo
      );
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="registerWrapper">
      <form className="registerForm" onSubmit={(e) => handleSubmit(e)}>
        <h1>新規登録</h1>
        <label className="label">ユーザー名</label>
        <input type="text" className="input" ref={usernameRef} />
        <label className="label">メールアドレス</label>
        <input type="email" className="input" ref={emailRef} />
        <label className="label">パスワード</label>
        <input type="password" className="input" ref={passwordRef} />
        <button type="submit" className="registerButton">
          新規登録
        </button>
      </form>
    </div>
  );
};

export default Page;
