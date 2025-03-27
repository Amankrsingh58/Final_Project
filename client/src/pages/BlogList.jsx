import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../services/api";
import { motion } from "framer-motion";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("/blogs")
        .then((res) => {
          if (Array.isArray(res.data)) {
            setBlogs(res.data);
          } else if (res.data.blogs) {
            setBlogs(res.data.blogs);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load blogs. Please try again later.");
          setLoading(false);
        });
    }, 1500);
  }, []);

  const truncateContent = (content, maxLength = 150) => {
    return content.length > maxLength ? content.substring(0, maxLength) + "..." : content;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500 py-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-10 drop-shadow-lg">
        📖 Latest Blogs
      </h1>

      {error && <p className="text-center text-red-500 text-lg mt-10">{error}</p>}

      {loading ? (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              className="bg-white rounded-xl shadow-lg p-6 animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 mb-3"></div>
              <div className="h-10 bg-gray-300 rounded w-32"></div>
            </motion.div>
          ))}
        </div>
      ) : blogs.length > 0 ? (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-5 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">{blog.title}</h2>
                <p className="text-gray-700 text-sm sm:text-base">{truncateContent(blog.content)}</p>
                <Link
                  to={`/blog/${blog._id}`}
                  className="inline-block mt-4 px-3 sm:px-4 py-2 text-white text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-md hover:opacity-90 transition duration-200"
                >
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-white text-lg">No blogs available.</p>
      )}
    </div>
  );
};

export default BlogList;
