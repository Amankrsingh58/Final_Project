import React from 'react';
import './Card.css';

function App() {
  const tutors = [
    {
      id: '853302',
      experience: '25 year',
      imageUrl: " https://imgs.search.brave.com/qpWKmEBSVFV6azClAAZSqb9C2fNMWLbZaXhYJ_tlwFw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvc3RlcGhl/bi53ZWJw",
    },
    {
      id: '853302',
      experience: '25 year',
      imageUrl: " https://imgs.search.brave.com/qpWKmEBSVFV6azClAAZSqb9C2fNMWLbZaXhYJ_tlwFw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvc3RlcGhl/bi53ZWJw",
    },
    {
      id: '853302',
      experience: '25 year',
      imageUrl: " https://imgs.search.brave.com/qpWKmEBSVFV6azClAAZSqb9C2fNMWLbZaXhYJ_tlwFw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvc3RlcGhl/bi53ZWJw",
    },
    {
      id: '20019',
      experience: '10 year',
      imageUrl: 'https://imgs.search.brave.com/bQDraoG_AAPe1jsb6cljXafkoD8bat2uVnM7o2_OMsU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IxLndlYnA',
    },
  
    {
      id: '20019',
      experience: '10 year',
      imageUrl: 'https://imgs.search.brave.com/prXoJXDh9S3JUT8vsvIFFfOmClBCezdwoGVd79zp9Gk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvY2hyaXN0/aW5lLndlYnA',
    },
    {
      id: '20019',
      experience: '10 year',
      imageUrl: 'https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA',
    },
  ];

  return (
    <div className="card">
      <h2>Verified Tutor</h2>
      <div className="tutor-container">
        {tutors.map((tutor, index) => (
          <div className="tutor-card" key={index}>
            <img src={tutor.imageUrl} alt="Tutor" className="tutor-image" />
            <div className="tutor-info">
              <p>Tutor ID: {tutor.id}</p>
              <p>Experience: {tutor.experience}</p>
            </div>
            <button className="contact-btn">Contact This Tutor</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
