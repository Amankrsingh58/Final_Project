import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Clock, User, Share2, BookmarkPlus, ThumbsUp, MessageCircle } from "lucide-react";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

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

  const handleLike = () => setIsLiked(!isLiked);
  const handleBookmark = () => setIsBookmarked(!isBookmarked);
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.excerpt,
        url: window.location.href,
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-20">
        <div className="animate-pulse space-y-8">
          <div className="h-64 bg-gray-200 rounded-xl"></div>
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oops!</h2>
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Blog Not Found</h2>
          <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br mt-15 from-blue-50 to-gray-50">
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
      >
        {/* Hero Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <img
            src={blog.coverImage || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"}
            alt={blog.title}
            className="w-full h-[400px] object-cover rounded-2xl shadow-lg mb-8"
          />
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              {/* <span>{format(new Date(blog.publishedAt), 'MMM dd, yyyy')}</span> */}
            </div>
            <div className="flex items-center">
              <User size={16} className="mr-1" />
              <span>{blog.author}</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {blog.title}
          </h1>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                isLiked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              } hover:bg-blue-100`}
            >
              <ThumbsUp size={18} />
              <span>{blog.likes || 0}</span>
            </button>
            
            <button
              onClick={handleBookmark}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                isBookmarked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              } hover:bg-blue-100`}
            >
              <BookmarkPlus size={18} />
              <span>Save</span>
            </button>
            
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 transition-colors"
            >
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="prose prose-lg max-w-none"
        >
          <div className="text-gray-700 leading-relaxed space-y-6">
            {blog.content}
          </div>

          {/* Key Takeaways */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Key Takeaways</h2>
            <ul className="space-y-3">
              {blog.keyTakeaways?.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-blue-500">✓</span>
                  <span className="text-gray-700">{takeaway}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Comments Section */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MessageCircle size={24} />
              <span>Discussion</span>
            </h3>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <textarea
                placeholder="Share your thoughts..."
                className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                rows={4}
              />
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                Post Comment
              </button>
            </div>
          </div>
        </motion.div>
      </motion.article>
    </div>
  );
};

export default BlogDetails;