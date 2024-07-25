import { BookingAPI } from '../../features/booking/booking.api'; // Adjust the import path as necessary

const AllBookings = () => {
  const { data: bookings, isLoading, isError } = BookingAPI.useGetBookingQuery();

  if (isLoading) return <div className="text-center text-gray-500">Loading bookings...</div>;
  if (isError || !bookings) return <div className="text-center text-red-500">Failed to load bookings</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
      {bookings.length > 0 ? (
        <ul className="space-y-4">
          {bookings.map(booking => (
            <li key={booking.bookingId} className="border p-4 rounded-lg shadow-md">
              <p><span className="font-semibold">Booking ID:</span> {booking.bookingId}</p>
              <p><span className="font-semibold">User ID:</span> {booking.userId}</p>
              <p><span className="font-semibold">Vehicle ID:</span> {booking.vehicleId}</p>
              <p><span className="font-semibold">Location ID:</span> {booking.locationId}</p>
              <p><span className="font-semibold">Booking Date:</span> {booking.bookingDate}</p>
              <p><span className="font-semibold">Return Date:</span> {booking.returnDate}</p>
              <p><span className="font-semibold">Total Amount:</span> {booking.totalAmount}</p>
              <p><span className="font-semibold">Status:</span> {booking.bookingStatus}</p>
              <p><span className="font-semibold">Created at:</span> {booking.createdAt}</p>
              <p><span className="font-semibold">Updated at:</span> {booking.updatedAt}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No bookings found</p>
      )}
    </div>
  );
};

export default AllBookings;