import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useGetStudentByIdQuery } from '../features/auth/studentApi';
import { Clock, DollarSign, Star, MapPin, Check, X, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';  // For motion effects
import toast from 'react-hot-toast';
import { useCreateBokingMutation } from '../features/auth/bookingApi';
import { useSelector } from 'react-redux';

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState(null);

  const {user,isAuthenticated} = useSelector( (state) => state.auth);

  const { data: student, isLoading, isError } = useGetStudentByIdQuery(id);

  const [createBooking] = useCreateBokingMutation();

  const handleBookSession = async (id) => {
    const toastId = toast.loading("Booking...")
    try {

      if (!user) {
        toast.error('Please log in to book a Student');
        navigate('/login');
        return;
      }

      result =  await createBooking({tutorId:user._id, studentId:id, bookerRole:user.role}).unwrap();

        toast.success("Student Booked Successful!", {id:toastId})

      setError(null);
      
    } catch (err) {
      toast.error(err?.message || "Failed to book. Please try again later.", {id:toastId})
      console.error('Error booking session:', err);
    }
    finally{
      setTimeout(() => {
        toast.dismiss(toastId)
      }, 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (isError || !student) {
    toast.error("Try again")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700">
          Error loading student details. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Student Image Section */}
            <div className="md:w-1/3">
              <motion.div 
                className="h-64 md:h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={student.data.userId.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
                  alt={student.data.userId.userName} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Student Information and Details */}
            <div className="md:w-2/3 p-6 md:p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{student.data.userId.userName}</h1>
                    <p className="text-indigo-600 font-medium text-lg">{student.data.subjectInterested.join(', ')}</p>
                  </div>
               
                </div>
                
                <div className="mt-6 flex flex-wrap gap-4"> 
                  
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
                    <span>{student.data.city}, {student.data.state}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">About Me</h2>
                  <p className="text-gray-700">{student.data.bio || "No bio provided yet"}</p>
                </div>
                
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">SubjectInterested</h2>
                  <div className="flex flex-wrap gap-2">
                    {student.data.subjectInterested.map((subject, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="border-t border-gray-200">
            <div className="p-6 md:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6">Reach Out to Student</h2>

                {/* Error Handling */}
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700 mb-6">
                    {error}
                  </div>
                )}

                {/* Booking Success Message */}
                {bookingSuccess && (
                  <motion.div 
                    className="bg-green-50 border-l-4 border-green-400 p-4 text-green-700 mb-6 flex items-center"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <Check className="h-5 w-5 mr-2" />
                    <span>Session booked successfully! You can view your bookings in your account.</span>
                  </motion.div>
                )}

                {/* Date Picker */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select a Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      defaultValue={Date.now()}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={format(new Date(), 'yyyy-MM-dd')}
                      className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div> */}

                {/* Booking Button */}
                <div className="mt-6">
                  <button
                    onClick={() => handleBookSession(student.data._id)}
                    // disabled={!selectedDate}
                    className={`w-full bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors ${
                      selectedDate ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Offer Tuition
                  </button>
                </div>

                <p className="text-sm text-gray-500 mt-4 text-center">
                  You won't be charged until after the session
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
