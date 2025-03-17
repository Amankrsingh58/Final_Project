// import React, { useState, useEffect } from 'react';
// import { format } from 'date-fns';
// import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
// import { Link } from 'react-router-dom';
// // import toast from 'react-hot-toast';

// const Bookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('upcoming');

//   // Dummy data for bookings
//   const dummyBookings = [
//     {
//       _id: '1',
//       createdAt: '2025-03-10T12:00:00Z',
//       date: '2025-03-15',
//       startTime: '10:00',
//       endTime: '11:00',
//       status: 'confirmed',
//       notes: 'Bring your notes.',
//       tutor: {
//         _id: 'tutor1',
//         name: 'John Doe',
//         subject: 'Math',
//         imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
//       },
//     },
//     {
//       _id: '2',
//       createdAt: '2025-03-08T12:00:00Z',
//       date: '2025-03-18',
//       startTime: '14:00',
//       endTime: '15:00',
//       status: 'pending',
//       notes: null,
//       tutor: {
//         _id: 'tutor2',
//         name: 'Jane Smith',
//         subject: 'Science',
//         imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
//       },
//     },
//   ];

//   useEffect(() => {
//     const fetchBookings = () => {
//       setLoading(true);
//       // Simulate fetching data from API
//       setTimeout(() => {
//         setBookings(dummyBookings);
//         setLoading(false);
//       }, 1000);
//     };

//     fetchBookings();
//   }, []);

//   const cancelBooking = (bookingId) => {
//     try {
//       // Simulate canceling booking
//       setBookings(bookings.map((booking) => 
//         booking._id === bookingId ? { ...booking, status: 'cancelled' } : booking
//       ));
      
//       // toast.success('Booking cancelled successfully');
//     } catch (err) {
//       console.error('Error cancelling booking:', err);
//       // toast.error('Failed to cancel booking. Please try again later.');
//     }
//   };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case 'confirmed':
//         return (
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//             <CheckCircle className="h-3 w-3 mr-1" />
//             Confirmed
//           </span>
//         );
//       case 'pending':
//         return (
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//             <AlertCircle className="h-3 w-3 mr-1" />
//             Pending
//           </span>
//         );
//       case 'cancelled':
//         return (
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//             <XCircle className="h-3 w-3 mr-1" />
//             Cancelled
//           </span>
//         );
//       default:
//         return (
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//             {status}
//           </span>
//         );
//     }
//   };

//   const isUpcoming = (booking) => {
//     const bookingDate = new Date(`${booking.date}T${booking.startTime}`);
//     return bookingDate > new Date() && booking.status !== 'cancelled';
//   };

//   const isPast = (booking) => {
//     const bookingDate = new Date(`${booking.date}T${booking.startTime}`);
//     return bookingDate <= new Date() || booking.status === 'cancelled';
//   };

//   const upcomingBookings = bookings.filter(isUpcoming);
//   const pastBookings = bookings.filter(isPast);

//   if (loading) {
//     return (
//       <div className="pt-16 min-h-screen bg-gray-50 flex justify-center items-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="pt-16 min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">My Bookings</h1>

//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="border-b border-gray-200">
//             <nav className="flex -mb-px">
//               <button
//                 onClick={() => setActiveTab('upcoming')}
//                 className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
//                   activeTab === 'upcoming'
//                     ? 'border-indigo-500 text-indigo-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 Upcoming ({upcomingBookings.length})
//               </button>
//               <button
//                 onClick={() => setActiveTab('past')}
//                 className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
//                   activeTab === 'past'
//                     ? 'border-indigo-500 text-indigo-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 Past ({pastBookings.length})
//               </button>
//             </nav>
//           </div>

//           <div className="p-6">
//             {error && (
//               <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700 mb-6">
//                 {error}
//               </div>
//             )}

//             {activeTab === 'upcoming' && upcomingBookings.length === 0 ? (
//               <div className="text-center py-8">
//                 <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming bookings</h3>
//                 <p className="text-gray-600 mb-4">
//                   You don't have any upcoming tutoring sessions scheduled.
//                 </p>
//                 <Link
//                   to="/tutors"
//                   className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Find a Tutor
//                 </Link>
//               </div>
//             ) : activeTab === 'past' && pastBookings.length === 0 ? (
//               <div className="text-center py-8">
//                 <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No past bookings</h3>
//                 <p className="text-gray-600">
//                   You don't have any past tutoring sessions.
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {(activeTab === 'upcoming' ? upcomingBookings : pastBookings).map((booking) => (
//                   <div
//                     key={booking._id}
//                     className="bg-gray-50 rounded-lg p-6"
//                   >
//                     <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//                       <div className="flex items-center mb-4 md:mb-0">
//                         <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
//                           <img
//                             src={booking.tutor.imageUrl}
//                             alt={booking.tutor.name}
//                             className="h-full w-full object-cover"
//                           />
//                         </div>
//                         <div>
//                           <h3 className="text-lg font-semibold">{booking.tutor.name}</h3>
//                           <p className="text-indigo-600">{booking.tutor.subject}</p>
//                         </div>
//                       </div>
//                       <div className="flex flex-col items-start md:items-end">
//                         <div className="mb-2">{getStatusBadge(booking.status)}</div>
//                         <div className="flex items-center text-gray-600 text-sm">
//                           <Calendar className="h-4 w-4 mr-1" />
//                           <span>{format(new Date(booking.date), 'MMMM d, yyyy')}</span>
//                         </div>
//                         <div className="flex items-center text-gray-600 text-sm">
//                           <Clock className="h-4 w-4 mr-1" />
//                           <span>{booking.startTime} - {booking.endTime}</span>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {activeTab === 'upcoming' && booking.status !== 'cancelled' && (
//                       <div className="mt-4 flex justify-end">
//                         <button
//                           onClick={() => cancelBooking(booking._id)}
//                           className="text-red-600 hover:text-red-800 text-sm font-medium"
//                         >
//                           Cancel Booking
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Bookings;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, Clock, DollarSign, Star, Award, BookOpen, MapPin, Check, X } from 'lucide-react';

const dummyTutor = {
  id: "1",
  name: "John Doe",
  subject: "Mathematics",
  hourly_rate: 50,
  experience_years: 5,
  bio: "I am an experienced Math tutor with a passion for teaching and helping students understand complex concepts.",
  image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  availability: {
    monday: ["10:00 AM - 11:00 AM", "1:00 PM - 2:00 PM"],
    tuesday: ["9:00 AM - 10:00 AM", "2:00 PM - 3:00 PM"],
    wednesday: ["11:00 AM - 12:00 PM", "3:00 PM - 4:00 PM"],
    thursday: ["10:00 AM - 11:00 AM", "1:00 PM - 2:00 PM"],
    friday: ["9:00 AM - 10:00 AM", "3:00 PM - 4:00 PM"]
  }
};

const TutorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [tutor, setTutor] = useState(dummyTutor); // Using dummy data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  useEffect(() => {
    // This is where you would typically fetch data from the database
    // For this example, we are using dummy data
    setLoading(false);
    setTutor(dummyTutor);
    setSelectedDate(format(new Date(), 'yyyy-MM-dd')); // Set the default date to today
  }, [id]);

  const handleBookSession = () => {
    if (!selectedDate || !selectedTime) {
      setError('Please select a date and time for your session');
      return;
    }
    
    // Simulate booking logic (no actual API call in this example)
    setBookingSuccess(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedTime('');
    }, 3000);
  };

  const getAvailableTimeSlots = () => {
    if (!tutor || !tutor.availability || !selectedDate) {
      return [];
    }
    
    const dayOfWeek = format(new Date(selectedDate), 'EEEE').toLowerCase();
    return tutor.availability[dayOfWeek] || [];
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !tutor) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
          <div className="text-red-500 mb-4">
            <X className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-center mb-4">Error Loading Tutor</h2>
          <p className="text-gray-600 text-center mb-6">{error || 'Tutor not found'}</p>
          <button
            onClick={() => navigate('/tutors')}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Back to Tutors
          </button>
        </div>
      </div>
    );
  }

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
                    
                    {/* <div className="mt-6">
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
                    </div> */}
                  </div>
                  
                  {/* <div className="bg-gray-50 p-6 rounded-lg">
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
                  </div> */}
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
