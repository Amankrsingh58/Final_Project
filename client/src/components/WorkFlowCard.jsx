import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Users, BookOpen, Briefcase } from "lucide-react";

const WorkFlowCard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [displayedData, setDisplayedData] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const data = [
    {
      title: "For Parents",
      description:
        "Find qualified and experienced tutors who make learning engaging and effective for your child. Our matching process ensures the perfect fit for your specific needs.",
      buttonText: "Post Requirement",
      image: "https://img.freepik.com/free-photo/father-painting-with-daughter-fathers-day_23-2147805505.jpg?t=st=1743233239~exp=1743236839~hmac=75e5bf04aade45f36fbeb1a3a517b0716938fc261774cd6060db6fd2a4b74198&w=1380",
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "For Tutors",
      description:
        "Join our community of educators, showcase your expertise, and connect with students who need your skills. Create your professional profile and start teaching today.",
      buttonText: "Join as Tutor",
      image: "https://img.freepik.com/free-photo/father-daughter-spending-quality-time-indoors_23-2148510988.jpg?t=st=1743233752~exp=1743237352~hmac=15358dde8d0783c0ee3670fc767d694d3a29adc0ab1ee143b56bfcfe6cc1ea8e&w=1380",
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
    },
  
  ];

  const adjustArrayLength = () => {
    const screenWidth = window.innerWidth;
    setDisplayedData(screenWidth > 810 ? data : data.slice(0, 2));
  };

  useEffect(() => {
    adjustArrayLength();
    window.addEventListener('resize', adjustArrayLength);
    return () => window.removeEventListener('resize', adjustArrayLength);
  }, []);

  const handleClick = () => {
    if (token) {
      setShowModal(true);
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to MyTutorMatch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connecting passionate educators with eager learners for personalized learning experiences
          </p>
        </motion.div>

        <div className="sm:grid sm:gap-8 lg:flex lg:mx-auto lg:w-[80%] lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group relative  bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 z-10" />
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2 z-20">
                  <div className="text-gray-800">
                    {item.icon}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h2>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {item.description}
                </p>
                <button
                  onClick={handleClick}
                  className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r ${item.color} text-white font-semibold hover:opacity-90 transition-opacity group`}
                >
                  {item.buttonText}
                  <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
              >
                <div className="flex items-center justify-between p-6 border-b">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Already Posted
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6">
                    You have already submitted a post. You can view and manage your existing posts in your dashboard.
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WorkFlowCard;