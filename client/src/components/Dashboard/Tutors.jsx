import React, { useState, useEffect } from 'react';
import { useLocation,Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Clock, DollarSign, BookOpen } from 'lucide-react';
import { useDeleteTutorMutation, useGetAllTutorQuery } from '../../features/auth/tutorApi';
import { useSendNoticeMutation } from '../../features/auth/noticeApi';
import toast from 'react-hot-toast';

const TutorsList = () => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    id:"",
    role:"Tutor"
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [filteredTutors, setFilteredTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [subjectFilter, setSubjectFilter] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  
  const location = useLocation();

  const { data: allTutor, isLoading, isError } = useGetAllTutorQuery();

  const [sendNotice] = useSendNoticeMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess(null);
  };

  const [deleteTutor] = useDeleteTutorMutation();

  const handleDelete = async(id) => {
    const toastId = toast.loading('Deleting User...');
    try{
        await deleteTutor(id).unwrap();
        toast.success('User Deleted', { id: toastId });
    } catch(error){
      toast.error("Cannot delete user try again",{id:toastId});
    }
    finally {
      setTimeout( () => toast.dismiss(toastId), 2000);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // setError(null);
    const toastId = toast.loading('Submitting Request...');
    try {
      
      const response = await sendNotice({
        id: selectedStudentId,
        subject: formData.subject,
        message: formData.message,
        role:formData.role

      }).unwrap();
      
      setSuccess("Help request submitted successfully!");
      toast.success('Submitted', { id: toastId });
      setShowModal(false);
      setFormData({ subject: "", message: "" });
    } finally {
      setLoading(false);
      setTimeout( () => toast.dismiss(toastId), 2000);
    }
  };

  useEffect(() => {
    if (allTutor) {
      setFilteredTutors(allTutor.allTutor || []);
      setLoading(false);
    }
  }, [allTutor]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const subjectParam = params.get('subject');
    if (subjectParam) {
      setSubjectFilter(subjectParam);
    }
  }, [location.search]);

  useEffect(() => {
    if (allTutor?.allTutor) {
      applyFilters();
    }
  }, [subjectFilter, priceRange, experienceLevel, searchQuery, allTutor]);

  const applyFilters = () => {
    if (!allTutor?.allTutor) return;
  
    let filtered = [...allTutor.allTutor];
  
    // Apply subject filter
    if (subjectFilter) {
      filtered = filtered.filter(tutor =>
        tutor.subjects.some(subject =>
          subject.toLowerCase().includes(subjectFilter.toLowerCase())
        )
      );
    }
  
    // Apply price range filter
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(tutor =>
          tutor.hourly_rate >= min && tutor.hourly_rate <= max
        );
      } else {
        filtered = filtered.filter(tutor => tutor.hourly_rate >= min);
      }
    }
  
    // Apply experience level filter
    if (experienceLevel) {
      filtered = filtered.filter(tutor => {
        const experienceYears = Number(tutor.experience);
  
        if (isNaN(experienceYears)) return false;
  
        switch (experienceLevel) {
          case 'beginner':
            return experienceYears <= 2;
          case 'intermediate':
            return experienceYears > 2 && experienceYears <= 5;
          case 'expert':
            return experienceYears > 5;
          default:
            return true; 
        }
      });
    }
  
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tutor =>
        tutor.userId.userName.toLowerCase().includes(query) ||
        tutor.city.toLowerCase().includes(query) ||
        tutor.subjects.some(subject => subject.toLowerCase().includes(query)) ||
        (tutor.bio && tutor.bio.toLowerCase().includes(query))
      );
    }
  
    // Update the filtered tutors
    setFilteredTutors(filtered);
  };
  

  const resetFilters = () => {
    setSubjectFilter('');
    setPriceRange('');
    setExperienceLevel('');
    setSearchQuery('');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700">
        There was an error fetching the tutor data.
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Tutor</h1>
            <p className="mt-2 text-gray-600">Browse our qualified tutors and find the right match for your learning needs</p>
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="mt-4 md:mt-0 flex items-center bg-white px-4 py-2 rounded-md shadow-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-5 w-5 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <motion.div 
          className={`bg-white rounded-lg shadow-md p-6 mb-8 ${showFilters ? 'block' : 'hidden'}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative text-gray-700">
              <input
                type="text"
                placeholder="Search subject,city, name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Subject Filter */}
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Subjects</option>
              <option value="mathematics">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="biology">Biology</option>
              <option value="english">English</option>
            </select>

            {/* Price Range Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Any Price</option>
              <option value="0-25">2000 - 2500/m</option>
              <option value="25-50">2500 - 3000/m</option>
              <option value="50-75">3000 - 4000/m</option>
              <option value="75">5000+ /hr</option>
            </select>

            {/* Experience Level Filter */}
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Any Experience</option>
              <option value="beginner">Beginner (0-2 years)</option>
              <option value="intermediate">Intermediate (3-5 years)</option>
              <option value="expert">Expert (5+ years)</option>
            </select>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={resetFilters}
              className="mr-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset Filters
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Apply Filters
            </button>
          </div>
        </motion.div>

        {filteredTutors.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tutors found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any tutors matching your criteria. Try adjusting your filters or check back later.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredTutors?.map((tutor) => (
              <motion.div
                key={tutor._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                variants={itemVariants}
              >
                  <div className="h-48 overflow-hidden">
                  <img 
                    src={tutor?.userId?.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start flex-wrap gap-1">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{tutor?.userId?.userName}</h3>
                      <h3 className="text-md font-semibold text-gray-700">{tutor?.userId?.email}</h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {tutor.subjects.map((subject, index) => (
                          <span 
                            key={index}
                            className="inline-block bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    ₹{tutor.fee}/month
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{tutor.experience} years experience</span>
                  </div>
                  
                  {tutor.city && (
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span>Location: {tutor.city}</span>
                    </div>
                  )}
                  
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    <span>4.9 (120 reviews)</span>
                  </div>
                  
                  {tutor.bio && (
                    <p className="mt-4 text-gray-600 line-clamp-3">{tutor.bio}</p>
                  )}
                  
                  <div className="mt-6 flex justify-between md:gap-0 sm:flex-col flex-wrap md:flex-row sm:gap-[1rem] sm:items-baseline md:items-center">
                    <Link to={`/tutor/${tutor._id}`} className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                      View Profile
                    </Link>
                    <button onClick={() =>{setSelectedStudentId(tutor._id), setShowModal(true)} } className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium">
                      Send Notice
                    </button>
                    <button onClick={() =>handleDelete(tutor._id) } className="bg-red-600 mr-1 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium">
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-gray-800 p-5 rounded-lg shadow-lg w-[90%] max-w-md">
      <h2 className="text-2xl text-white font-bold text-center">Send Notice</h2>

      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          name="subject"
          placeholder="Enter subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full p-2 mt-2 bg-gray-700 text-white rounded"
          required
        />

        <textarea
          name="message"
          placeholder="Enter your message..."
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 mt-2 bg-gray-700 text-white rounded"
          required
        />

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      {success && <p className="text-green-500 text-center mt-2">{success}</p>}
    </div>
  </div>
)}
    </div>
  );
};

export default TutorsList;