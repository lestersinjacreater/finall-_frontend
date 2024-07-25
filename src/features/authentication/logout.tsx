import React from 'react';
import { loginAPI } from '../../features/authentication/login.api'; // Adjust the import path as necessary

const Logout: React.FC = () => {
    const [logout, { isLoading, isError, isSuccess }] = loginAPI.useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            // Optionally, redirect to login page or show a success message
            console.log('Logged out successfully');
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    return (
        <div>
            <button onClick={handleLogout} disabled={isLoading}>
                {isLoading ? 'Logging out...' : 'Logout'}
            </button>
            {isError && <p>Error logging out. Please try again.</p>}
            {isSuccess && <p>Logged out successfully.</p>}
        </div>
    );
};

export default Logout;