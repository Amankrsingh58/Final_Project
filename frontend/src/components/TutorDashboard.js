import React, { useState } from 'react';
import './TutorDashboard.css';

const TutorDashboard = () => {
  // Dummy data
  const [profile] = useState({
    name: 'John Doe',
    bio: 'Experienced Math Tutor specializing in calculus and algebra.',
    experience: 5,
  });

  const [earnings] = useState([
    { month: 'January', amount: 300 },
    { month: 'February', amount: 400 },
    { month: 'March', amount: 500 },
  ]);

  const [reviews] = useState([
    { student: 'Alice', feedback: 'Excellent tutor!' },
    { student: 'Bob', feedback: 'Helped me ace my exams!' },
  ]);

  const [availability, setAvailability] = useState('Mon 10-12, Wed 2-4');

  const updateAvailability = () => {
    alert('Availability updated to: ' + availability);
  };

  return (
    <div className="dashboard-container">
      {/* Profile Section */}
      <section className="profile-section">
        <h2>Profile Management</h2>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Bio:</strong> {profile.bio}</p>
        <p><strong>Experience:</strong> {profile.experience} years</p>
        <button>Edit Profile</button>
      </section>

      {/* Availability Section */}
      <section className="availability-section">
        <h2>Schedule Availability</h2>
        <textarea
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          placeholder="Enter available slots (e.g., Mon 10-12, Wed 2-4)"
        />
        <button onClick={updateAvailability}>Update Availability</button>
      </section>

      {/* Earnings Section */}
      <section className="earnings-section">
        <h2>Earnings Overview</h2>
        <div className="earnings-chart">
          {earnings.map((earning, index) => (
            <div key={index} className="earning-bar">
              <div
                className="bar"
                style={{ height: `${earning.amount / 5}px` }}
                title={`$${earning.amount}`}
              ></div>
              <span>{earning.month}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <h2>Reviews</h2>
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <strong>{review.student}:</strong> {review.feedback}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default TutorDashboard;
