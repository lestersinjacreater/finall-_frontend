
import { bookingAPI } from '../../features/booking/booking.api'; // Adjust the import path as necessary

const AllBookings = () => {
  const { data: bookings, isLoading, isError } = bookingAPI.useGetAllBookingsQuery();

  if (isLoading) return <div>Loading bookings...</div>;
  if (isError || !bookings) return <div>Failed to load bookings</div>;

  return (
    <div>
      <h2>All Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map(booking => (
            <li key={booking.bookingId}>
              <p>Booking ID: {booking.bookingId}</p>
              <p>User ID: {booking.userId}</p>
              <p>Vehicle ID: {booking.vehicleId}</p>
              <p>Location ID: {booking.locationId}</p>
              <p>Booking Date: {booking.bookingDate}</p>
              <p>Return Date: {booking.returnDate}</p>
              <p>Total Amount: {booking.totalAmount}</p>
              <p>Status: {booking.bookingStatus}</p>
              <p>Created at: {booking.createdAt}</p>
              <p>Updated at: {booking.updatedAt}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
};

export default AllBookings;