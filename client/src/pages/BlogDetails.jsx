import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`/blogs/${id}`)
      .then((res) => {
        console.log("Blog data fetched:", res.data.blog);
        setBlog(res.data.blog);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setError("Failed to fetch blog details. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-20 animate-pulse">
        <div className="h-8 w-3/4 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 w-5/6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-2/3 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-300 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-20 text-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-20 text-center">
        <p className="text-gray-600">No blog found with the given ID.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight">{blog.title}</h1>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{blog.content}</p>

        <motion.div
          className="mt-6 p-4 sm:p-6 border-l-4 border-blue-500 bg-gray-100 rounded-lg"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-700">Key Takeaways</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2 text-sm sm:text-base">
            <li>✅ Define learning goals before choosing a tutor.</li>
            <li>✅ Check tutor's qualifications & experience.</li>
            <li>✅ Read reviews & ask for recommendations.</li>
            <li>✅ Attend a demo class before finalizing.</li>
            <li>✅ Consider budget & availability.</li>
            <li>✅ Use verified platforms like MyTutorMatch for trusted tutors.</li>
          </ul>
        </motion.div>

        <motion.div
          className="text-center mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <a
            href="/tutor"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white text-sm sm:text-lg font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full shadow-md transition duration-300"
          >
            Find a Home Tutor Now 🚀
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BlogDetails;
