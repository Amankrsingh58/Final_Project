import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useGetTutorByIdQuery } from '../features/auth/tutorApi';
import { Clock, DollarSign, Star, MapPin, Check, X, Calendar, Phone, Notebook, Book, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';  
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useCreateBokingMutation } from '../features/auth/bookingApi';
import { FaWhatsapp } from "react-icons/fa";

const TutorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState(null);

  const {user,isAuthenticated} = useSelector( (state) => state.auth);

  const { data: tutor, isLoading, isError } = useGetTutorByIdQuery(id);
  const [createBooking] = useCreateBokingMutation();


  const handleBookSession = async (id) => {
    const toastId = toast.loading("Booking...")
    try {

      if (!user) {
        toast.error('Please log in to book a Student');
        navigate('/login');
        return;
      }

       await createBooking({studentId:user._id, tutorId:id, bookerRole:user.role}).unwrap();

        toast.success("Tutor Booked Successful!", {id:toastId})

      setError(null);
      
    } catch (err) {
      toast.error("Failed to book. Please try again later.", {id:toastId})
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

  if (isError || !tutor) {
    toast.error("Try again")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700">
          Error loading tutor details. Please try again later.
        </div>
      </div>
    );
  }

  const message = 'Hello! I would like to contact you.';

  const handleClick = () => {
    const url = `https://wa.me/${tutor.data.phoneNo}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Tutor Image Section */}
            <div className="md:w-1/3">
              <motion.div 
                className="h-64 md:h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={tutor.data.userId.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
                  alt={tutor.data.userId.userName} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Tutor Information and Details */}
            <div className="md:w-2/3 p-6 md:p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-700">{tutor.data.userId.userName}</h1>
                  </div>
                  <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-lg font-bold">
                  ₹{tutor.data.fee}/month
                  </div>
                </div>
                
                <div className="mt-6 flex flex-wrap flex-col gap-4">
                  <div className="flex items-center text-gray-700">
                    <Phone className="h-5 w-5 mr-2 text-indigo-500" />
                    <span>(+91) {tutor.data.phoneNo}</span>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 mr-2 text-indigo-500" />
                    <span>{tutor.data.experience} years experience</span>
                  </div>
                  
                  {/* <div className="flex items-center text-gray-700">
                    <Star className="h-5 w-5 mr-2 text-yellow-400" />
                    <span>4.9 (120 reviews)</span>
                  </div> */}
                  
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 mr-2 text-indigo-500" />
                    <span>{tutor.data.city}, {tutor.data.state}</span>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <BookOpen className="h-5 w-5 mr-2 text-indigo-500" />
                    {tutor.data.subjects.map((subject, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>

                </div>
                
               {tutor.bio && <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">About Me</h2>
                  <p className="text-gray-700">{tutor.data.bio || "No bio provided yet"}</p>
                </div>}
                
                
              </motion.div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="border-t border-gray-200">
            <div className="pl-6 pr-6 pb-6 md:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {/* <h2 className="text-2xl font-bold mb-6">Request a Session</h2> */}

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
                    onClick={() => handleBookSession(tutor.data._id)}
                    className={`w-full bg-indigo-600 text-white px-6 py-3 cursor-pointer rounded-md font-medium hover:bg-indigo-700 transition-colors ${
                      selectedDate ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Request Tuition
                  </button>

                  <button
                    onClick={handleClick}
                    className={`w-full gap-2 items-center bg-[#25d366] text-white px-6 py-3 mt-2 cursor-pointer rounded-md flex justify-center hover:bg-green-700 transition-colors ${
                      selectedDate ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  ><span>Chat On</span> 
                    <FaWhatsapp className='font-lg w-8  h-6 text-center'/>
                  </button>
                 
                </div>

                <p className="text-sm text-gray-500 mt-4 text-center">
                 Have A Good Talk...!
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetail;
