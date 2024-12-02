import React from "react";
import "./Topbar.css";

const Topbar = ({ title }) => {
  return (
    <header className="topbar">
      <h1>{title}</h1>
      <div className="actions">
        <button className="action-button">Profile</button>
      </div>
    </header>
  );
};

export default Topbar;
