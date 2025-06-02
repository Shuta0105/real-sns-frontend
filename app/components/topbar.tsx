import React from "react";
import { useRouter } from "next/navigation";

const Topbar = () => {
  const router = useRouter();
  return (
    <header>
      <div className="headerWrapper">
        <h2 className="headerTitle">Real SNS</h2>
        <div>
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
