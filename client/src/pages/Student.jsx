import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Clock, DollarSign, BookOpen, MapPin, GraduationCap, Calendar } from 'lucide-react';
import { useGetAllStudentQuery } from '../features/auth/studentApi';
import { format } from 'date-fns';


const StudentsList = () => {
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [subjectFilter, setSubjectFilter] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();

  const { data: allStudent, isLoading, isError } = useGetAllStudentQuery();

  useEffect(() => {
    if (allStudent) {
      setFilteredStudents(allStudent.allStudent || []);
      setLoading(false);
    }
  }, [allStudent]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const subjectParam = params.get('subject');
    if (subjectParam) {
      setSubjectFilter(subjectParam);
    }
  }, [location.search]);

  useEffect(() => {
    if (allStudent?.allStudent) {
      applyFilters();
    }
  }, [subjectFilter,gradeFilter, searchQuery, allStudent]);

  const applyFilters = () => {
    if (!allStudent?.allStudent) return;

    let filtered = [...allStudent.allStudent];

    if (subjectFilter) {
      filtered = filtered.filter(student =>
        student.subjectInterested.some(subject =>
          subject.toLowerCase().includes(subjectFilter.toLowerCase())
        )
      );
    }

    // Apply grade range filter
    if (gradeFilter) {
      filtered = filtered.filter(student => {
        if (typeof student.grade === 'number') {
          return student.grade === parseInt(gradeFilter, 10); 
        } else if (Array.isArray(student.grade)) {
          return student.grade.includes(gradeFilter);
        } else {
          return false;
        }
      });
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
    
      filtered = filtered.filter(student => {
        const userNameMatch = student.userId?.userName?.toLowerCase().includes(query);
        const cityMatch = student.city?.toLowerCase().includes(query);
        const subjectMatch = student.subjectInterested?.some(subject => 
          subject.toLowerCase().includes(query)
        );
        const gradeMatch = typeof student.grade === 'string' 
          ? student.grade.toLowerCase().includes(query) 
          : student.grade.toString().includes(query); 
        const bioMatch = student.bio?.toLowerCase().includes(query);
    
        return userNameMatch || cityMatch || subjectMatch || gradeMatch || bioMatch;
      });
    }
    

    setFilteredStudents(filtered);
  };

  const resetFilters = () => {
    setSubjectFilter('');
    setGradeFilter('');
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
        There was an error fetching the student data.
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Student</h1>
            <p className="mt-2 text-gray-600">Browse our qualified students and find the right match for your learning needs</p>
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

            {/* Grade Filter */}
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Grades</option>
              <option value="1">1st Grade</option>
              <option value="2">2nd Grade</option>
              <option value="3">3rd Grade</option>
              <option value="4">4th Grade</option>
              <option value="5">5th Grade</option>
              <option value="6">6th Grade</option>
              <option value="7">7th Grade</option>
              <option value="8">8th Grade</option>
              <option value="9">9th Grade</option>
              <option value="10">10th Grade</option>
              <option value="11">11th Grade</option>
              <option value="12">12th Grade</option>
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

        {filteredStudents.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any students matching your criteria. Try adjusting your filters or check back later.
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
            {filteredStudents.map((student) => (
              <motion.div
                key={student._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                variants={itemVariants}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={student.userId.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"}
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-gray-700">{student.userId.userName}</h3>
                      
                    </div>

                  </div>

                  {/* <div className="mt-4 flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{student.experience} years experience</span>
                  </div> */}


                  <div className="mt-1 flex items-center text-sm text-gray-500">
                  <BookOpen className="h-4 w-4 mr-1 text-blue-400" />
                    <span>Subjects : {student.subjectInterested}</span>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                  <GraduationCap className="h-4 w-4 mr-1 text-blue-400" />
                    <span>Class : {student.grade}</span>
                  </div>

                  {student.city && (
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                       <MapPin className="h-4 w-4 mr-1 text-blue-400" />
                      <span>Location : {student.city}, {student.state}</span>
                    </div>
                  )}

                    <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1 text-blue-400" />
                    <span>Posted On : {format(new Date(student.createdAt), 'MMMM d, yyyy')}</span>
                    </div>

                  {/* {student.bio && (
                    <p className="mt-4 text-gray-600 line-clamp-3">{student.bio}</p>
                  )} */}

                  <div className="mt-6 flex justify-between items-center">
                    <Link to={`/student/${student._id}`} className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                      View Profile
                    </Link>
                    <Link to={`/student/${student._id}`} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium">
                      Offer Tuition
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

export default StudentsList;