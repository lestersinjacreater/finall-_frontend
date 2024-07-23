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
    path: '/userdashboard',
    element: <Userdashboard />,
    errorElement: <Error />
  },

  {
    path: '/bookinghistory',
    element: <BookingsHistory />,
    errorElement: <Error />
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