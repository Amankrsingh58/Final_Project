import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Clock, DollarSign, BookOpen } from 'lucide-react';

// interface Tutor {
//   id: string;
//   name: string;
//   subject: string;
//   hourly_rate: number;
//   experience_years: number;
//   bio: string;
//   image_url: string;
// }

const TutorsList =()=>{
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [subjectFilter, setSubjectFilter] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();

  useEffect(() => {
    const fetchTutors = () => {
      // Dummy data instead of fetching from Supabase
      const dummyTutors = [
        {
          id: '1',
          name: 'John Doe',
          subject: 'Mathematics',
          hourly_rate: 50,
          experience_years: 5,
          bio: 'Experienced math tutor with a passion for teaching.',
          image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        },
        {
          id: '2',
          name: 'Jane Smith',
          subject: 'Science',
          hourly_rate: 45,
          experience_years: 3,
          bio: 'Friendly science tutor specializing in chemistry and physics.',
          image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        },
        {
          id: '3',
          name: 'Alice Johnson',
          subject: 'English',
          hourly_rate: 30,
          experience_years: 2,
          bio: 'Passionate about literature and creative writing.',
          image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        },
      ];

      setLoading(true);
      setTimeout(() => {
        setTutors(dummyTutors);
        setFilteredTutors(dummyTutors);
        setLoading(false);
      }, 1000); // Simulate loading time
    };
    
    fetchTutors();
  }, []);

  useEffect(() => {
    // Get subject from URL query params if present
    const params = new URLSearchParams(location.search);
    const subjectParam = params.get('subject');
    
    if (subjectParam) {
      setSubjectFilter(subjectParam);
    }
  }, [location.search]);

  useEffect(() => {
    applyFilters();
  }, [subjectFilter, priceRange, experienceLevel, searchQuery, tutors]);

  const applyFilters = () => {
    let filtered = [...tutors];
    
    // Apply subject filter
    if (subjectFilter) {
      filtered = filtered.filter(tutor => 
        tutor.subject.toLowerCase() === subjectFilter.toLowerCase()
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
        // Handle "100+" case
        filtered = filtered.filter(tutor => tutor.hourly_rate >= min);
      }
    }
    
    // Apply experience level filter
    if (experienceLevel) {
      switch (experienceLevel) {
        case 'beginner':
          filtered = filtered.filter(tutor => tutor.experience_years <= 2);
          break;
        case 'intermediate':
          filtered = filtered.filter(tutor => 
            tutor.experience_years >= 3 && tutor.experience_years <= 5
          );
          break;
        case 'expert':
          filtered = filtered.filter(tutor => tutor.experience_years > 5);
          break;
      }
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tutor => 
        tutor.name.toLowerCase().includes(query) || 
        tutor.subject.toLowerCase().includes(query) ||
        tutor.bio.toLowerCase().includes(query)
      );
    }
    
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search by name or subject"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">All Subjects</option>
                <option value="mathematics">Mathematics</option>
                <option value="science">Science</option>
                <option value="english">English</option>
                <option value="programming">Programming</option>
                <option value="languages">Languages</option>
                <option value="history">History</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="biology">Biology</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Any Price</option>
                <option value="0-25">$0 - $25</option>
                <option value="25-50">$25 - $50</option>
                <option value="50-75">$50 - $75</option>
                <option value="75-100">$75 - $100</option>
                <option value="100">$100+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Any Experience</option>
                <option value="beginner">Beginner (0-2 years)</option>
                <option value="intermediate">Intermediate (3-5 years)</option>
                <option value="expert">Expert (5+ years)</option>
              </select>
            </div>
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

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700">
            {error}
          </div>
        ) : filteredTutors.length === 0 ? (
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
                key={tutor.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                variants={itemVariants}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={tutor.image_url || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
                    alt={tutor.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{tutor.name}</h3>
                      <p className="text-indigo-600 font-medium">{tutor.subject}</p>
                    </div>
                    <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                      ${tutor.hourly_rate}/hr
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{tutor.experience_years} years experience</span>
                  </div>
                  
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    <span>4.9 (120 reviews)</span>
                  </div>
                  
                  <p className="mt-4 text-gray-600 line-clamp-3">{tutor.bio}</p>
                  
                  <div className="mt-6 flex justify-between items-center">
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                      View Profile
                    </button>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium">
                      Book Session
                    </button>
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
