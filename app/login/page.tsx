"use client";

import React, { useContext, useRef } from "react";
import "./login.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AuthContext } from "../state/AuthContext";

const Page = () => {
  const router = useRouter();
  const { dispatch } = useContext(AuthContext);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let userInfo;
    if (emailRef.current && passwordRef.current) {
      userInfo = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/login",
        userInfo
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data[0] });
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="registerWrapper">
      <form className="registerForm" onSubmit={(e) => handleSubmit(e)}>
        <h1>ログイン</h1>
        <label className="label">メールアドレス</label>
        <input type="email" className="input" ref={emailRef} />
        <label className="label">パスワード</label>
        <input type="password" className="input" ref={passwordRef} />
        <button type="submit" className="registerButton">
          ログイン
        </button>
      </form>
    </div>
  );
};

export default Page;
