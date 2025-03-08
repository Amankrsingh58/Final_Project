import React from "react";
import Card from "./StatsCard";
import "./ContentGrid.css";

const ContentGrid = () => {
  return (
    <div className="content-grid">
      <Card color="purple">Card 1</Card>
      <Card color="blue">Card 2</Card>
      <Card color="green">Card 3</Card>
      {/* Add more cards as needed */}
    </div>
  );
};

export default ContentGrid;
