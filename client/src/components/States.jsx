import React from 'react';
import './Stats.css'; // Import your CSS file for styling

const Stats = () => {
  const stats = [
    {
      icon: '📄', // Use emojis or replace with an <img> or SVG tag for actual icons
      value: '125+',
      label: 'Requirement Posted',
    },
    {
      icon: '👨‍🏫', // Replace with the tutor icon
      value: '35+',
      label: 'Registered Tutors',
    },
    {
      icon: '👍', // Replace with the thumbs-up icon
      value: '4.5+',
      label: 'Rating on Social Media',
    },
  ];

  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <div className="stat-item" key={index}>
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
