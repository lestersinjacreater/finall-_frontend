import React, { useState, useEffect } from 'react';
import { bookingAPI } from '../../features/booking/booking.api';
import { paymentAPI } from '../../features/payments/payments.api';
import { loadStripe } from '@stripe/stripe-js';

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
    const [createBooking] = bookingAPI.useCreateBookingMutation();
    const [createPayment] = paymentAPI.useCreatePaymentMutation();

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
            const bookingResponse = await createBooking(formFields).unwrap();
            if (!bookingResponse || !bookingResponse.bookingId) {
                throw new Error('Booking ID is undefined or response is invalid');
            }

            const paymentResponse = await createPayment({
                bookingId: bookingResponse.bookingId,
                userId: formFields.userId,
                amount: formFields.totalAmount,
                paymentStatus: 'Pending',
                paymentMethod: 'card',
            }).unwrap();

            const stripe = await stripePromise;
            if (stripe) {
                await stripe.redirectToCheckout({ sessionId: paymentResponse.sessionId });
            } else {
                setError('Stripe failed to initialize');
            }
        } catch (error: any) {
            setError(error.response?.data?.message || 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#1f1f1f', padding: '2rem', borderRadius: '0.5rem' }}>
            <label style={{ color: '#f0f0f0', display: 'block', marginBottom: '1rem' }}>
                Booking Date
                <input type="date" name="bookingDate" value={formFields.bookingDate} onChange={handleChange} required style={{ backgroundColor: '#2f2f2f', color: '#f0f0f0', border: 'none', padding: '0.5rem', borderRadius: '0.25rem', width: '100%' }} />
            </label>
            <label style={{ color: '#f0f0f0', display: 'block', marginBottom: '1rem' }}>
                Return Date
                <input type="date" name="returnDate" value={formFields.returnDate} onChange={handleChange} required style={{ backgroundColor: '#2f2f2f', color: '#f0f0f0', border: 'none', padding: '0.5rem', borderRadius: '0.25rem', width: '100%' }} />
            </label>
            <label style={{ color: '#f0f0f0', display: 'block', marginBottom: '1rem' }}>
                Total Amount
                <input type="text" name="totalAmount" value={formFields.totalAmount} readOnly style={{ backgroundColor: '#2f2f2f', color: '#f0f0f0', border: 'none', padding: '0.5rem', borderRadius: '0.25rem', width: '100%' }} />
            </label>
            <label style={{ color: '#f0f0f0', display: 'block', marginBottom: '1rem' }}>
                Location Name
                <input type="text" name="locationName" value={formFields.locationName} onChange={handleChange} required style={{ backgroundColor: '#2f2f2f', color: '#f0f0f0', border: 'none', padding: '0.5rem', borderRadius: '0.25rem', width: '100%' }} />
            </label>
            <label style={{ color: '#f0f0f0', display: 'block', marginBottom: '1rem' }}>
                Address
                <input type="text" name="address" value={formFields.address} onChange={handleChange} required style={{ backgroundColor: '#2f2f2f', color: '#f0f0f0', border: 'none', padding: '0.5rem', borderRadius: '0.25rem', width: '100%' }} />
            </label>
            <label style={{ color: '#f0f0f0', display: 'block', marginBottom: '1rem' }}>
                Contact Phone
                <input type="tel" name="contactPhone" value={formFields.contactPhone} onChange={handleChange} required style={{ backgroundColor: '#2f2f2f', color: '#f0f0f0', border: 'none', padding: '0.5rem', borderRadius: '0.25rem', width: '100%' }} />
            </label>
            <button type="submit" disabled={isSubmitting} style={{ backgroundColor: '#4a4a4a', color: '#f0f0f0', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '1rem' }}>
                {isSubmitting ? 'Submitting...' : 'Proceed to Payment'}
            </button>
            {error && <div style={{ color: '#ff6b6b', marginTop: '1rem' }}>{error}</div>}
        </form>
    );
};

export default Booking;