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
import Payments from './pages/usersdashboard/payments.tsx';
import CustomerSupportTickets from './pages/usersdashboard/customer.support ticket.tsx';
import Notifications from './pages/usersdashboard/notificatio.tsx';

import Profile from './pages/userprofile/userprofile.tsx';
import Logout from './features/authentication/logout.tsx';

import Admindashboard from './pages/admindashboard/admin dasboard.tsx';
import Allbookings from './pages/admindashboard/all booking.tsx';
import NotificationForm from  './pages/admindashboard/create.notification.tsx';
import ManageLocations from './pages/admindashboard/manage locations.tsx';
import ManageUsers from  './pages/admindashboard/managecustomers.tsx';








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
    path: '/booking-success',
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
    
  },
  {  
  path: '/bookinghistory',
  element: <BookingsHistory />,
  errorElement: <Error />
},
{
  path: '/payments',
  element: <Payments />,
  errorElement: <Error />
},
{
  path: '/customer.support tickets',
  element: <CustomerSupportTickets />,
  errorElement: <Error />
},
{
  path: '/notifications',
  element: <Notifications />,
  errorElement: <Error />

},
















{
  path: '/admindashboard',
  element: <Admindashboard />,
  errorElement: <Error />
},
{
  path: '/allbookings',
  element: <Allbookings />,
  errorElement: <Error />
},
{
  path: '/NotificationForm',
  element: <NotificationForm/>,
  errorElement: <Error />
},
{
  path: '/ManageLocations',
  element: <ManageLocations/>,
  errorElement: <Error/>
},
{
  path: '/ManageUsers',
  element: <ManageUsers/>,
  errorElement: <Error/>

},






{
  path: '/Profile',
  element: <Profile/>,
  errorElement: <Error/>

},
{
  path: '/logout',
  element: <Logout/>,
  errorElement: <Error/>
  
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