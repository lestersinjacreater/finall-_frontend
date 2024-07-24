import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from '../features/users/userSlice';



// Import other APIs if needed
import { usersAPI } from '../features/users/user.api';
import { loginAPI } from '../features/authentication/login.api';
import { registerAPI } from '../features/authentication/register.api';
import { VehicleAPI } from '../features/vehicles/vehiclesandspecifications.api';
import { BookingAPI } from '../features/booking/booking.api';
import { paymentAPI } from '../features/payments/payments.api';
import { customerSupportAPI}  from'../features/customer support tickets/customersupport.api';
import { notificationsAPI } from '../features/notifications/notifications.api';
import { locationAPI } from '../features/locations/locations.api';
import { profileAPI } from '../features/users/profile.api';


// Define persist configuration
const persistConfig = {
    key: 'root',
    storage,
};

// Combine reducers
const rootReducer = combineReducers({
    [usersAPI.reducerPath]: usersAPI.reducer,
    [loginAPI.reducerPath]: loginAPI.reducer,
    [registerAPI.reducerPath]: registerAPI.reducer,
    [VehicleAPI.reducerPath]: VehicleAPI.reducer,
    [BookingAPI .reducerPath]: BookingAPI .reducer,
    [paymentAPI.reducerPath]: paymentAPI.reducer,
    [customerSupportAPI.reducerPath]: customerSupportAPI.reducer,
    [notificationsAPI.reducerPath]: notificationsAPI.reducer,
    [locationAPI.reducerPath]: locationAPI.reducer,
    [profileAPI.reducerPath]: profileAPI.reducer,
    user: userSlice,
    // Add additional reducers here as needed
    // [timelineAPI.reducerPath]: timelineAPI.reducer,
    // [VehicleSpecificationsAPI.reducerPath]: VehicleSpecificationsAPI.reducer,
    // [vehiclesTableAPI.reducerPath]: vehiclesTableAPI.reducer,
    // [bookingVehicleAPI.reducerPath]: bookingVehicleAPI.reducer,
    // [paymentAPI.reducerPath]: paymentAPI.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
            .concat(usersAPI.middleware)
            .concat(loginAPI.middleware)
            .concat(registerAPI.middleware)
            .concat(BookingAPI .middleware)
            .concat(VehicleAPI.middleware)
            .concat(paymentAPI.middleware)
            .concat(customerSupportAPI.middleware)
            .concat(notificationsAPI.middleware)
            .concat(locationAPI.middleware)
            .concat(profileAPI.middleware),
            
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;