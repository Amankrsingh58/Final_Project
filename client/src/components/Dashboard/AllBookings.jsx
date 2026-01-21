import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, MapPin, BookOpenText, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetUserBookingQuery } from '../../features/auth/bookingApi';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('current');

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const id = user._id;
  const { data, isLoading, error: apiError } = useGetUserBookingQuery({ id });

  useEffect(() => {
    if (!isLoading && data?.bookings) {
      setBookings(data.bookings); 
      setLoading(false);
    } else if (apiError) {
      setError('Failed to load bookings');
      setLoading(false);
    }
  }, [data, isLoading, apiError]);

  const cancelBooking = (bookingId) => {
    try {
    } catch (err) {
      console.error('Error cancelling booking:', err);
      setError('Failed to cancel booking. Please try again later.');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Accepted
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  const isUpcoming = (booking) => {
    return booking.bookingStatus === 'pending';
  };

  const isPast = (booking) => {
    return booking.bookingStatus === 'accepted' || booking.bookingStatus === 'cancelled';
  };

  const upcomingBookings = bookings.filter(isUpcoming);
  const pastBookings = bookings.filter(isPast);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Bookings</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('current')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'current'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Current ({upcomingBookings.length})
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                History ({pastBookings.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700 mb-6">
                {error}
              </div>
            )}

            {activeTab === 'current' && upcomingBookings.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No current bookings</h3>
                <p className="text-gray-600 mb-4">
                  You don't have any current tutoring sessions scheduled.
                </p>
                <Link
                  to="/tutors"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Find a Tutor
                </Link>
              </div>
            ) : activeTab === 'history' && pastBookings.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No history bookings</h3>
                <p className="text-gray-600">
                  You don't have any history tutoring sessions.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {(activeTab === 'current' ? upcomingBookings : pastBookings).map((booking) => (
                  <div key={booking._id} className="bg-gray-50 rounded-lg p-6">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                      <div className="flex items-center mb-4 md:mb-0">
                        <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                          <img
                            src={booking.tutorId.image || 'fallback_image_url'} 
                            alt={booking.tutorId.userName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Tutor : {booking.tutorId.userName}</h3>
                          <h3 className="text-lg font-semibold">Student : {booking.studentId.userName}</h3>
                          <h3 className="text-lg font-semibold">Booker Role : {booking.bookerRole}</h3>
                          <div className="flex items-center text-gray-600 text-sm font-semibold">
                            <Phone className="h-4 w-4 mr-1 text-sm font-semibold" />
                            <span>  {8287393644}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row md:gap-8 md:items-start">
                        <div>
                          <p className="text-gray-600 text-sm">{booking.tutorId.tutorId.experience} yrs of Experience</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {booking.tutorId.tutorId.subjects.map((subject, index) => (
                              <span
                                key={index}
                                className="inline-block bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full"
                              >
                                {subject}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center text-gray-600 text-sm mt-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{booking.tutorId.tutorId.city}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-start md:items-end">
                        <div className="mb-2">{getStatusBadge(booking.bookingStatus)}</div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <span>Posted On: {format(new Date(booking.createdAt), 'MMMM d, yyyy')}</span>
                        </div>
                      </div>
                    </div>

                    {activeTab === 'current' && booking.bookingStatus !== 'cancelled' && (
                      <div className="mt-4 flex gap-2 md:justify-end">
                        <button
                          onClick={() => cancelBooking(booking._id)}
                          className="text-white bg-red-600 text-sm font-medium cursor-pointer hover:scale-95 transition-all duration-200 px-4 py-2 rounded-md"
                        >
                          Cancel 
                        </button>
                        {user.role !== booking.bookerRole && (
                          <button
                            onClick={() => cancelBooking(booking._id)}
                            className="text-white cursor-pointer text-sm font-medium px-4 py-2 rounded-md duration-300 hover:scale-95 transition-all bg-green-600"
                          >
                            Accept 
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBookings;
