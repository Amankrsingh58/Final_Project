import React, { useEffect, useState } from "react";
import axios from "../../services/api";
import { motion } from "framer-motion";


const AdminBlogPanel = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", content: "", author: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(fetchBlogs, 1500); 
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/blogs");

      if (Array.isArray(res.data)) {
        setBlogs(res.data);
      } else if (res.data.blogs) {
        setBlogs(res.data.blogs);
      } else {
        setBlogs([]);
      }

      setError(null);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to load blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlog = async () => {
    if (!newBlog.title || !newBlog.content || !newBlog.author) {
      alert("⚠️ Title, content, and author are required!");
      return;
    }

    try {
      const res = await axios.post("/blogs", newBlog);
      setBlogs((prevBlogs) => [...prevBlogs, res.data]);
      setNewBlog({ title: "", content: "", author: "" });
    } catch (err) {
      alert("❌ Failed to create blog. Please try again.");
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("⚠️ Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`/blogs/${id}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (err) {
      alert("❌ Failed to delete blog.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-20">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Blog Management</h1>

      <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Create a New Blog</h2>
        <input
          type="text"
          placeholder="Blog Title"
          className="border p-3 w-full mb-3 rounded-md"
          value={newBlog.title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          className="border p-3 w-full mb-3 rounded-md h-24"
          value={newBlog.content}
          onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author Name"
          className="border p-3 w-full mb-3 rounded-md"
          value={newBlog.author}
          onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
        />
        <button
          className="w-full bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-700 transition duration-200"
          onClick={handleCreateBlog}
        >
          + Create Blog
        </button>
      </div>

      {loading && <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
        </div>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Existing Blogs</h2>
        {blogs.length > 0 ? (
          <ul className="divide-y divide-gray-300">
            {blogs.map((blog) => (
              <li key={blog._id} className="py-4">
                <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
                <p className="text-sm text-gray-600">✍️ By {blog.author}</p>
                <button
                  className="mt-3 bg-red-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
                  onClick={() => handleDeleteBlog(blog._id)}
                >
                  🗑️ Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-700">📭 No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminBlogPanel;
