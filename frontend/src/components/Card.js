import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import tutor from "../Images/Tutor1.jpg";
import tutor2 from "../Images/sunny.jpg";
import "./Card.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Card() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024, // For tablets
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // For small tablets and large phones
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // For mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const tutors = [
    {
      id: "853302",
      experience: "25 year",
      imageUrl: tutor2,
      phone: "950900003",
    },
    {
      id: "20019",
      experience: "10 year",
      imageUrl:
        "https://imgs.search.brave.com/bQDraoG_AAPe1jsb6cljXafkoD8bat2uVnM7o2_OMsU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IxLndlYnA",
    },
    {
      id: "2022",
      experience: "2 year",
      imageUrl: tutor,
    },
    {
      id: "20019",
      experience: "10 year",
      imageUrl:
        "https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA",
    },
  ];

  return (
    <div className="card">
      <div className="headingtag">
        <b className="heading">Our Top Tutors</b>
      </div>
      <div className="tutor-container">
        <Slider {...settings}>
          {tutors.map((tutor, index) => (
            <motion.div
              className="tutor-card"
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img src={tutor.imageUrl} alt="Tutor" className="tutor-image" />
              <div className="tutor-info">
                <p>Tutor ID: {tutor.id}</p>
                <p>Experience: {tutor.experience}</p>
              </div>
              <Link to="/TutorDetails">
                <motion.button
                  whileHover={{ backgroundColor: "#00bcd4", color: "#fff" }}
                  className="contact-btn"
                >
                  Contact This Tutor
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Card;
