import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, Clock, DollarSign, Star, Award, BookOpen, MapPin, Check, X } from 'lucide-react';

// Dummy Tutor Data
const dummyTutor = {
  id: '1',
  name: 'John Doe',
  subject: 'Mathematics',
  hourly_rate: 50,
  experience_years: 10,
  bio: 'I am a passionate and experienced tutor with over 10 years of experience teaching math at all levels. I focus on helping students build a strong foundation in mathematical concepts.',
  image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  availability: {
    monday: ['9:00 AM - 10:00 AM', '2:00 PM - 3:00 PM'],
    tuesday: ['10:00 AM - 11:00 AM', '4:00 PM - 5:00 PM'],
    wednesday: ['11:00 AM - 12:00 PM', '1:00 PM - 2:00 PM'],
    thursday: ['9:00 AM - 10:00 AM', '3:00 PM - 4:00 PM'],
    friday: ['12:00 PM - 1:00 PM', '5:00 PM - 6:00 PM'],
  }
};

const TutorDetail = () => {
  const navigate = useNavigate();
  
  const [tutor] = useState(dummyTutor);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleBookSession = () => {
    if (!selectedDate || !selectedTime) {
      setError('Please select a date and time for your session');
      return;
    }
    
    setBookingSuccess(true);
    
    // Reset booking status after 3 seconds
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedTime('');
    }, 3000);
  };

  const getAvailableTimeSlots = () => {
    if (!tutor || !tutor.availability || !selectedDate) {
      return [];
    }

    const dayOfWeek = format(new Date(selectedDate), 'eeee').toLowerCase();
    return tutor.availability[dayOfWeek] || [];
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <motion.div 
                className="h-64 md:h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={tutor.image_url || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
                  alt={tutor.name} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            
            <div className="md:w-2/3 p-6 md:p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{tutor.name}</h1>
                    <p className="text-indigo-600 font-medium text-lg">{tutor.subject} Tutor</p>
                  </div>
                  <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-lg font-bold">
                    ${tutor.hourly_rate}/hr
                  </div>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-4">
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                    <span>{tutor.experience_years} years experience</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <Star className="h-5 w-5 mr-2 text-yellow-400" />
                    <span>4.9 (120 reviews)</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
                    <span>Online & In-person</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">About Me</h2>
                  <p className="text-gray-700">{tutor.bio}</p>
                </div>
                
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">Specializations</h2>
                  <div className="flex flex-wrap gap-2">
                    {['Algebra', 'Calculus', 'Geometry', 'Statistics', 'Trigonometry'].map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="border-t border-gray-200">
            <div className="p-6 md:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6">Book a Session</h2>
                
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700 mb-6">
                    {error}
                  </div>
                )}
                
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select a Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={format(new Date(), 'yyyy-MM-dd')}
                      className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Time Slots
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {getAvailableTimeSlots().length > 0 ? (
                          getAvailableTimeSlots().map((timeSlot, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedTime(timeSlot)}
                              className={`px-4 py-2 rounded-md text-sm ${
                                selectedTime === timeSlot
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                              }`}
                            >
                              {timeSlot}
                            </button>
                          ))
                        ) : (
                          <p className="col-span-2 text-gray-500 italic">
                            No available time slots for this date
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tutor:</span>
                        <span className="font-medium">{tutor.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subject:</span>
                        <span className="font-medium">{tutor.subject}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">
                          {selectedDate ? format(new Date(selectedDate), 'MMMM d, yyyy') : 'Not selected'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">{selectedTime || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">1 hour</span>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-3">
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>${tutor.hourly_rate}.00</span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleBookSession}
                      disabled={!selectedDate || !selectedTime}
                      className={`w-full bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors ${
                        !selectedDate || !selectedTime ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Book Session
                    </button>
                    
                    <p className="text-sm text-gray-500 mt-4 text-center">
                      You won't be charged until after the session
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetail;
