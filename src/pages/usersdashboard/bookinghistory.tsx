import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

interface DecodedToken {
  userId: string;
  // Add other properties from the decoded token if needed
}

const BookingsHistory: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUserId(decoded.userId);
      } catch (err) {
        console.error('Failed to decode token:', err);
        // Handle error, e.g., redirect to login or show an error message.
      }
    } else {
      console.error('Token is null');
      // Handle the case where token is null, e.g., redirect to login or show an error message.
    }
  }, []);

  // Hard-coded bookings data
  const hardCodedBookings = [
    {
      bookingId: '1',
      vehicleId: '101',
      locationId: '201',
      bookingDate: '2024-01-15',
      returnDate: '2024-01-20',
      totalAmount: '150.00',
      bookingStatus: 'Completed',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12'
    },
    {
      bookingId: '2',
      vehicleId: '102',
      locationId: '202',
      bookingDate: '2024-01-16',
      returnDate: '2024-01-21',
      totalAmount: '200.00',
      bookingStatus: 'Completed',
      createdAt: '2024-01-11',
      updatedAt: '2024-01-13'
    },
    {
      bookingId: '3',
      vehicleId: '103',
      locationId: '203',
      bookingDate: '2024-02-01',
      returnDate: '2024-02-05',
      totalAmount: '180.00',
      bookingStatus: 'Completed',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-22'
    },
    {
      bookingId: '4',
      vehicleId: '104',
      locationId: '204',
      bookingDate: '2024-02-10',
      returnDate: '2024-02-15',
      totalAmount: '220.00',
      bookingStatus: 'Completed',
      createdAt: '2024-01-25',
      updatedAt: '2024-01-27'
    },
    {
      bookingId: '5',
      vehicleId: '105',
      locationId: '205',
      bookingDate: '2024-03-01',
      returnDate: '2024-03-10',
      totalAmount: '250.00',
      bookingStatus: 'Completed',
      createdAt: '2024-02-01',
      updatedAt: '2024-02-05'
    },
    {
      bookingId: '6',
      vehicleId: '106',
      locationId: '206',
      bookingDate: '2024-03-15',
      returnDate: '2024-03-20',
      totalAmount: '270.00',
      bookingStatus: 'Completed',
      createdAt: '2024-02-20',
      updatedAt: '2024-02-22'
    },
    {
      bookingId: '7',
      vehicleId: '107',
      locationId: '207',
      bookingDate: '2024-04-01',
      returnDate: '2024-04-10',
      totalAmount: '300.00',
      bookingStatus: 'Completed',
      createdAt: '2024-03-01',
      updatedAt: '2024-03-05'
    },
  ];

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-200 mb-8 text-center">Booking History</h1>
      {hardCodedBookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {hardCodedBookings.map((booking) => (
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
      <div className="text-center mt-8">
        <Link to="/userdashboard" className="text-blue-500 hover:underline">
          Go to User Dashboard
        </Link>
      </div>
    </div>
  );
};

export default BookingsHistory;
