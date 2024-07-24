import React from 'react';
import { BookingAPI } from '../../features/booking/booking.api';

const BookingsHistory: React.FC = () => {
  const userId: string | null = localStorage.getItem('userId'); // Fetch the user ID from local storage

  if (!userId) {
    return <div className="text-center text-gray-400">User ID not found. Please log in.</div>;
  }

  const { data: bookings, error, isLoading } = BookingAPI.useGetBookingByUserIdQuery(Number(userId));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching booking history.</div>;

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-200 mb-8 text-center">Booking History</h1>
      {bookings && bookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {bookings.map((booking) => (
            <div
              key={booking.bookingId}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 cursor-pointer"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-200 mb-2">Booking ID: {booking.bookingId}</h3>
                <p className="text-lg text-gray-400 mb-4">
                  <span className="text-gray-300">Vehicle ID:</span> {booking.vehicleId}
                </p>
                <p className="text-lg text-gray-400 mb-4">
                  <span className="text-gray-300">Location ID:</span> {booking.locationId}
                </p>
                <p className="text-lg text-gray-400 mb-4">
                  <span className="text-gray-300">Booking Date:</span> {booking.bookingDate}
                </p>
                <p className="text-lg text-gray-400 mb-4">
                  <span className="text-gray-300">Return Date:</span> {booking.returnDate}
                </p>
                <p className="text-lg text-gray-400 mb-4">
                  <span className="text-gray-300">Total Amount:</span> ${booking.totalAmount}
                </p>
                <p className="text-lg text-gray-400 mb-4">
                  <span className="text-gray-300">Status:</span> {booking.bookingStatus}
                </p>
                <p className="text-lg text-gray-400 mb-4">
                  <span className="text-gray-300">Created At:</span> {booking.createdAt}
                </p>
                <p className="text-lg text-gray-400 mb-4">
                  <span className="text-gray-300">Updated At:</span> {booking.updatedAt}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400">No bookings found.</div>
      )}
    </div>
  );
};

export default BookingsHistory;
