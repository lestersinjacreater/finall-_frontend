// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// redux and redux-persist
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store.ts';
import LandingPage from './pages/landingpage.tsx';
import Error from './pages/error.tsx';
import Timelinepage from './pages/timelinepage/timelinepage.tsx';
import Booking from './pages/bookings/bookings.tsx';
import Userdashboard from './pages/usersdashboard/usersdashboard.tsx';
import BookingsHistory from './pages/usersdashboard/bookinghistory.tsx';
import PaymentSuccess  from './pages/bookings/booking.sucsess.tsx';
import PaymentFailure from './pages/bookings/booking.failed.tsx';


// components
const router = createBrowserRouter([

  {
    path: '/',
    element: <LandingPage />,
    errorElement: <Error />
  },
  {
    path: '/timeline',
    element: <Timelinepage />,
    errorElement: <Error />
  },
  {
    path: '/bookings',
    element: <Booking />,
    errorElement: <Error />
  },
  {
    path: '/paymentsuccess',
    element: <PaymentSuccess />,
    errorElement: <Error />
  },
  {
    path: '/paymentfailure',
    element: <PaymentFailure />,
    errorElement: <Error />
  },
  
  {
    path: '/userdashboard',
    element: <Userdashboard />,
    errorElement: <Error />,
    children: [
      { path: '/bookinghistory', 
        element: <BookingsHistory />
       },
       





    ]
  },

  
  







]);

ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
</React.StrictMode>,
);