import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSubmithelpformMutation } from "../features/auth/helpFormApi";
import toast from "react-hot-toast";
import { 
  BookOpen, 
  MessageCircle, 
  X, 
  Send, 
  Loader2, 
  GraduationCap,
  Users,
  Clock,
  CheckCircle2,
  MessageCircleMore
} from "lucide-react";
import WorkFlowCard from "./WorkFlowCard";

function Container() {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [submithelpform] = useSubmithelpformMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const toastId = toast.loading('Submitting Request...');
    
    try {
      await submithelpform({ 
        subject: formData.subject, 
        message: formData.message 
      }).unwrap();
      
      setSuccess("Help request submitted successfully!");
      toast.success('Submitted', { id: toastId });
      setShowModal(false);
      setFormData({ subject: "", message: "" });
    } catch (error) {
      setError("Failed to submit. Try again.");
      toast.error(error.response?.data?.error || error.message, { id: toastId });
    } finally {
      setLoading(false);
      setTimeout(() => toast.dismiss(toastId), 1000);
    }
  };

  const workflowSteps = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Connect",
      description: "Find your perfect tutor match"
    },
    {
      icon: <MessageCircleMore className="w-6 h-6" />,
      title: "Chat",
      description: "Chat with your  matched tutor"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Learn",
      description: "Engage in interactive learning"
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Succeed",
      description: "Achieve your academic goals"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <WorkFlowCard />
      {/* Workflow Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your journey to academic success made simple and effective
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <div className="text-blue-600">{step.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Help Section */}
      <section className="bg-blue-600 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GraduationCap className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Help Getting Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Take advantage of our free online counseling and clear all your doubts
            </p>
            <button
              onClick={token ? () => setShowModal(true) : () => navigate("/login")}
              className="inline-flex items-center px-6 py-3 rounded-full bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-all transform hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Get Free Counseling
            </button>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
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
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">Get Help</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your subject"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Describe your question or concern..."
                    required
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                {success && (
                  <p className="text-green-500 text-sm">{success}</p>
                )}

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Container;