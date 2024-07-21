import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from '../features/users/userSlice';
import { VehicleAPI } from '../features/vehicles/vehiclesandspecifications.api';

// Import other APIs if needed
import { usersAPI } from '../features/users/user.api';
import { loginAPI } from '../features/authentication/login.api';
import { registerAPI } from '../features/authentication/register.api';

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
            .concat(VehicleAPI.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;