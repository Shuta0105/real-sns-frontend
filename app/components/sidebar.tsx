import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <div className="sidebarMenuIcon">
            <i className="fa-solid fa-house"></i>
            <div className="sidebarMenuIconTag">ホーム</div>
          </div>
          <div className="sidebarMenuIcon">
            <i className="fa-solid fa-magnifying-glass"></i>
            <div className="sidebarMenuIconTag">検索</div>
          </div>
          <div className="sidebarMenuIcon">
            <i className="fa-solid fa-bell"></i>
            <div className="sidebarMenuIconTag">通知</div>
          </div>
          <div className="sidebarMenuIcon">
            <i className="fa-solid fa-person"></i>
            <div className="sidebarMenuIconTag">プロフィール</div>
          </div>
          <div className="sidebarMenuIcon">
            <i className="fa-solid fa-gear"></i>
            <div className="sidebarMenuIconTag">設定</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
