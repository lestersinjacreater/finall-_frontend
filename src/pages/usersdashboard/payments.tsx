import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { paymentAPI } from '../../features/payments/payments.api'; // Adjust the import path according to your project structure

const Payments: React.FC = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState<number | null>(null);
  const { data: payments, error, isLoading } = useSelector((state: any) =>
    (userId ? paymentAPI.endpoints.getPaymentsByUserId.select(userId)(state) : { data: undefined }) as { data: any, error: any, isLoading: any }
  );

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
    }
  }, []);

  useEffect(() => {
    if (userId !== null) {
      dispatch(paymentAPI.endpoints.getPaymentsByUserId.initiate(userId) as any);
    }
  }, [userId, dispatch]);

  const hardcodedPayments = [
    { paymentId: '1', amount: 100, paymentStatus: 'Completed' },
    { paymentId: '2', amount: 200, paymentStatus: 'Completed' },
    { paymentId: '3', amount: 300, paymentStatus: 'Completed' },
    { paymentId: '4', amount: 400, paymentStatus: 'Completed' },
    { paymentId: '5', amount: 500, paymentStatus: 'Completed' },
    { paymentId: '6', amount: 600, paymentStatus: 'Completed' },
    { paymentId: '7', amount: 700, paymentStatus: 'Completed' },
    { paymentId: '8', amount: 800, paymentStatus: 'Completed' },
    { paymentId: '9', amount: 900, paymentStatus: 'Completed' },
    { paymentId: '10', amount: 1000, paymentStatus: 'Completed' },
  ];

  if (isLoading) return <div>Loading payments...</div>;
  if (error) return <div>Error fetching payments</div>;

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-200 mb-8 text-center">Payments</h2>
      <ul className="space-y-4">
        {payments && payments.length > 0 ? (
          payments.map((payment: { paymentId: string; amount: number; paymentStatus: string }) => (
            <li key={payment.paymentId.toString()} className="bg-gray-800 p-4 rounded-lg shadow-md text-gray-200">
              <p><strong>Payment ID:</strong> {payment.paymentId}</p>
              <p><strong>Amount:</strong> ${payment.amount}</p>
              <p><strong>Status:</strong> {payment.paymentStatus}</p>
            </li>
          ))
        ) : (
          hardcodedPayments.map((payment) => (
            <li key={payment.paymentId.toString()} className="bg-gray-800 p-4 rounded-lg shadow-md text-gray-200">
              <p><strong>Payment ID:</strong> {payment.paymentId}</p>
              <p><strong>Amount:</strong> ${payment.amount}</p>
              <p><strong>Status:</strong> {payment.paymentStatus}</p>
            </li>
          ))
        )}
      </ul>
      <div className="mt-8 text-center">
        <Link to="/userdashboard" className="text-blue-500 hover:underline">your dasboard</Link>
      </div>
    </div>
  );
};

export default Payments;
