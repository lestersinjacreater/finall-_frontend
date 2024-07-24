import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { BookingAPI } from '../../features/booking/booking.api'; // Import the booking API

// Initialize Stripe with your public key
const stripePromise = loadStripe('pk_test_51PfLsj2MixLHpnNSRGgtzO9CCu1gmQcMocDfPy7k7csSKkTBs5YmpDqzK7BgLMisuOFjbrv26nMPxex3pjUwQ9gO00ctq4Xp1A');

// Define the structure for the form fields
interface BookingFormFields {
  userId: number;
  vehicleId: number;
  bookingDate: string;
  returnDate: string;
  totalAmount: number;
  locationName: string;
  address: string;
  contactPhone: string;
  rentalRate: number;
}

const Booking: React.FC = () => {
  // Function to extract user ID from JWT token stored in localStorage
  const getUserIdFromToken = (): number => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        console.log('Decoded token:', decodedToken);
        return decodedToken.userId;
      } catch (error) {
        console.error('Invalid token:', error);
        throw new Error('Invalid token');
      }
    }
    console.error('No token found');
    throw new Error('No token found');
  };

  // Retrieve vehicle ID and rental rate from localStorage
  const vehicleId = parseInt(localStorage.getItem('vehicleId') || '0', 10);
  const rentalRate = parseFloat(localStorage.getItem('rentalRate') || '0');
  console.log('Vehicle ID:', vehicleId, 'Rental Rate:', rentalRate);

  // State for form fields, including user and vehicle information
  const [formFields, setFormFields] = useState<BookingFormFields>({
    userId: getUserIdFromToken(),
    vehicleId: vehicleId,
    bookingDate: '',
    returnDate: '',
    totalAmount: 0,
    locationName: '',
    address: '',
    contactPhone: '',
    rentalRate: rentalRate,
  });
  console.log('Initial form fields:', formFields);

  // State to manage form submission status and error messages
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use the mutation hook from the booking API slice for creating bookings
  const [createBooking] = BookingAPI.useCreateBookingsMutation();

  // Function to calculate the number of days between two dates
  const calculateDaysBetween = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Effect hook to calculate total amount whenever booking or return dates change
  useEffect(() => {
    if (formFields.bookingDate && formFields.returnDate) {
      const days = calculateDaysBetween(formFields.bookingDate, formFields.returnDate);
      setFormFields((prevFields) => ({
        ...prevFields,
        totalAmount: days * prevFields.rentalRate,
      }));
      console.log('Total amount calculated:', days * formFields.rentalRate);
    }
  }, [formFields.bookingDate, formFields.returnDate, formFields.rentalRate]);

  // Handler for form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
    console.log('Form field changed:', name, value);
  };

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    console.log('Submitting booking form:', formFields);

    try {
      // Perform the API call to create a booking
      const response = await createBooking(formFields).unwrap();
      console.log('Booking response:', response);

      if (!response || !response.bookingId) {
        throw new Error('Booking ID is undefined or response is invalid');
      }

      // Initialize Stripe and redirect to checkout
      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId: response.bookingId.toString() });
        console.log('Redirecting to checkout with sessionId:', response.bookingId);
      } else {
        console.error('Stripe initialization failed');
        setError('Stripe failed to initialize');
      }
    } catch (error: any) {
      console.error('Error during booking and payment process:', error);
      setError(error.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the booking form
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Book the vehicle</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Booking Date:</label>
          <input
            type="date"
            name="bookingDate"
            value={formFields.bookingDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Return Date:</label>
          <input
            type="date"
            name="returnDate"
            value={formFields.returnDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location Name:</label>
          <input
            type="text"
            name="locationName"
            value={formFields.locationName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address:</label>
          <input
            type="text"
            name="address"
            value={formFields.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contact Phone:</label>
          <input
            type="text"
            name="contactPhone"
            value={formFields.contactPhone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-300"
        >
          {isSubmitting ? 'Submitting...' : 'Create Booking'}
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-green-700 transition duration-300 disabled:bg-green-300"
        >
          {isSubmitting ? 'Proceeding to Pay...' : 'Proceed to Pay'}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Booking;
