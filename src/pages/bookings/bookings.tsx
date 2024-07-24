import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { bookingAPI } from '../../features/booking/booking.api'; // Adjust the import path as needed

const stripePromise = loadStripe('pk_test_51PfLsj2MixLHpnNSRGgtzO9CCu1gmQcMocDfPy7k7csSKkTBs5YmpDqzK7BgLMisuOFjbrv26nMPxex3pjUwQ9gO00ctq4Xp1A');

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

  // Use the mutation hook from the API slice
  const [createBooking] = bookingAPI.useCreateBookingMutation();

  const calculateDaysBetween = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    if (formFields.bookingDate && formFields.returnDate) {
      const days = calculateDaysBetween(formFields.bookingDate, formFields.returnDate);
      setFormFields((prevFields) => ({
        ...prevFields,
        totalAmount: days * prevFields.rentalRate,
      }));
    }
  }, [formFields.bookingDate, formFields.returnDate, formFields.rentalRate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

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
