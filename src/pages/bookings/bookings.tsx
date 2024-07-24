import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { bookingAPI } from '../../features/booking/booking.api'; // Import the booking API

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
        return decodedToken.userId;
      } catch {
        throw new Error('Invalid token');
      }
    }
    throw new Error('No token found');
    console.log ('User ID:', getUserIdFromToken());
  };

  // Retrieve vehicle ID and rental rate from localStorage
  const vehicleId = parseInt(localStorage.getItem('vehicleId') || '0', 10);
  const rentalRate = parseFloat(localStorage.getItem('rentalRate') || '0');

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

  // State to manage form submission status and error messages
  const [, setIsSubmitting] = useState(false);
  const [, setError] = useState<string | null>(null);

  // Use the mutation hook from the booking API slice for creating bookings
  const [createBooking] = bookingAPI.useCreateBookingMutation();

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
        console,
      }));
      console.log('Total amount:', days * formFields.rentalRate);
    }
  }, [formFields.bookingDate, formFields.returnDate, formFields.rentalRate]);

  // Handler for form field changes

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    console.log('Submitting booking form:', formFields);

    try {
      console.log('Submitting booking form:', formFields);

      // Perform the API call to create a booking
      const response = await createBooking(formFields).unwrap();

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
        {/* Form fields for booking, return dates, total amount, location, address, and contact phone */}
        {/* Submit button with dynamic text based on submission status and error message display */}
      </form>
    </div>
  );
};

export default Booking;