import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching payments</div>;
  if (!payments) return <div>No payments found</div>;

  return (
    <div>
      <h2>Payments</h2>
      <ul>
        {payments.map((payment: { paymentId: string; amount: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; paymentStatus: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
          <li key={payment.paymentId.toString()}>
            Payment ID: {payment.paymentId}, Amount: {payment.amount}, Status: {payment.paymentStatus}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Payments;