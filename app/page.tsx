"use client";

import "./page.css";
import Topbar from "./components/topbar";
import Sidebar from "./components/sidebar";
import TimeLine from "./components/timeline";
import Rightbar from "./components/rightbar";

export default function Home() {
  return (
    <>
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <TimeLine />
        <Rightbar />
      </div>
    </>
  );
}
