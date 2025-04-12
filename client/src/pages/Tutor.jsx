import React, { useState, useEffect } from 'react';
import { useLocation,Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search,Calendar, Filter,CheckCircle, Star, Clock, DollarSign, BookOpen, MapPin, Pen } from 'lucide-react';
import { useGetAllTutorQuery } from '../features/auth/tutorApi';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-300 rounded-t-lg"></div>
    <div className="p-6">
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-4"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
    </div>
  </div>
);

const TutorsList = () => {
  const {user, isAuthenticated} = useSelector( (state) => state.auth);

  const [bookingData, setBookingData] = useState({
    tutorId:"",
    studentId:user?._id,
    booker:'Student'
  });
  
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [subjectFilter, setSubjectFilter] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();

  const { data: allTutor, isLoading, isError } = useGetAllTutorQuery();

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
          tutor.fee >= min && tutor.fee <= max
        );
      } else {
        filtered = filtered.filter(tutor => tutor.fee >= min);
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
        (tutor.bio && tutor.bio.toLowerCase().includes(query)) ||
        (tutor.experience && tutor.experience==query)
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

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
  //     </div>
  //   );
  // }

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

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) :filteredTutors.length === 0 ? (
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
            {filteredTutors.map((tutor) => (
              <motion.div
                key={tutor._id}
                className="bg-white rounded-lg shadow-lg  border-gray-500 overflow-hidden hover:shadow-lg transition-shadow"
                variants={itemVariants}
              >
                  {/* <div className="h-48 overflow-hidden">
                  <img 
                    src={tutor.userId.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
                    alt={tutor.name} 
                    className="w-full h-full object-fit"
                  />
                </div> */}

                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-700">{tutor.userId.userName}</h3>
                     
                    </div>
                    <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    ₹{tutor.fee}/month
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <BookOpen className="h-4 w-4 mr-1 text-blue-400" />
                    Subjects : {tutor.subjects.map((subject, index) => (
                      <span key={index} >
                        {subject}
                      </span>
                    ))}                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1 text-blue-400" />
                    <span>{tutor.experience} years experience</span>
                  </div>
                  
                  {tutor.city && (
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1 text-blue-400" />
                      <span>Location: {tutor.city}</span>
                    </div>
                  )}
                  
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1 text-blue-400" />
                    <span>Posted On :{format(new Date(tutor.createdAt), 'MMMM d, yyyy')}</span>
                    </div>
                  
                 
                  
                  <div className="mt-6 flex justify-between items-center">
                    <Link to={isAuthenticated ? `/tutor/${tutor._id}` : "/signup"} className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                      View Profile
                    </Link>
                    <Link to={isAuthenticated ?`/tutor/${tutor._id}` : "/signup"} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium">
                    Request Tuition
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TutorsList;