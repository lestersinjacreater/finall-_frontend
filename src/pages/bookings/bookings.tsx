import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your public key
const stripePromise = loadStripe('pk_test_51PfLsj2MixLHpnNSRGgtzO9CCu1gmQcMocDfPy7k7csSKkTBs5YmpDqzK7BgLMisuOFjbrv26nMPxex3pjUwQ9gO00ctq4Xp1A');

// Define the form field interface
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

// Define the booking component
const Booking: React.FC = () => {
  // Retrieve userId from JWT token stored in local storage
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
  };

  const vehicleId = parseInt(localStorage.getItem('vehicleId') || '0', 10);
  const rentalRate = parseFloat(localStorage.getItem('rentalRate') || '0');

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate the number of days between two dates
  const calculateDaysBetween = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Update total amount whenever bookingDate, returnDate, or rentalRate changes
  useEffect(() => {
    if (formFields.bookingDate && formFields.returnDate) {
      const days = calculateDaysBetween(formFields.bookingDate, formFields.returnDate);
      setFormFields((prevFields) => ({
        ...prevFields,
        totalAmount: days * prevFields.rentalRate,
      }));
    }
  }, [formFields.bookingDate, formFields.returnDate, formFields.rentalRate]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      console.log('Submitting booking form:', formFields); // Debug form submission

      // Create a booking first
      const bookingResponse = await fetch('http://localhost:3000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formFields),
      });

      if (!bookingResponse.ok) {
        throw new Error('Failed to create booking');
      }

      const bookingData = await bookingResponse.json();
      console.log('Booking Response:', bookingData); // Debug booking response

      // Verify bookingId presence
      if (!bookingData || !bookingData.bookingId) {
        throw new Error('Booking ID is undefined or response is invalid');
      }

      // Create a payment session using the booking ID
      const paymentResponse = await fetch('http://localhost:3000/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: bookingData.bookingId,
          userId: formFields.userId,
          amount: formFields.totalAmount,
          paymentStatus: 'Pending',
          paymentMethod: 'card', // or the appropriate method
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error('Failed to create payment');
      }

      const paymentData = await paymentResponse.json();
      console.log('Payment Response:', paymentData); // Debug payment response

      // Redirect to Stripe checkout page
      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId: paymentData.sessionId });
        console.log('Redirecting to checkout with sessionId:', paymentData.sessionId); // Debug redirect
      } else {
        console.error('Stripe initialization failed'); // Error handling
        setError('Stripe failed to initialize');
      }
    } catch (error: any) {
      console.error('Error during booking and payment process:', error); // Debug error
      setError(error.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Book the vehicle</h1>
        <div className="mb-6">
          <label htmlFor="bookingDate" className="block text-gray-700 font-medium mb-2">
            Booking Date
          </label>
          <input
            type="date"
            id="bookingDate"
            name="bookingDate"
            value={formFields.bookingDate}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="returnDate" className="block text-gray-700 font-medium mb-2">
            Return Date
          </label>
          <input
            type="date"
            id="returnDate"
            name="returnDate"
            value={formFields.returnDate}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="totalAmount" className="block text-gray-700 font-medium mb-2">
            Total Amount
          </label>
          <input
            type="text"
            id="totalAmount"
            name="totalAmount"
            value={formFields.totalAmount}
            readOnly
            className="border border-gray-300 rounded-md px-4 py-2 w-full bg-gray-100"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="locationName" className="block text-gray-700 font-medium mb-2">
            Location Name
          </label>
          <input
            type="text"
            id="locationName"
            name="locationName"
            value={formFields.locationName}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formFields.address}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="contactPhone" className="block text-gray-700 font-medium mb-2">
            Contact Phone
          </label>
          <input
            type="tel"
            id="contactPhone"
            name="contactPhone"
            value={formFields.contactPhone}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Proceed to Payment'}
        </button>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </form>
    </div>
  );
};

export default Booking;
