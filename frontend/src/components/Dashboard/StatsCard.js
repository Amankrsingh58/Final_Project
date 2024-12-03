import React from "react";
import "./StatsCard.css";

const Card = ({ color, children }) => {
  return <div className={`card ${color}`}>{children}</div>;
};

export default Card;
