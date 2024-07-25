import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import {jwtDecode} from 'jwt-decode'; // Correctly import jwt-decode

// Define the interface for the decoded JWT token
interface DecodedToken {
    role: string;
    exp: number; // Example of other claims
}

// Define the Navbar component
const Navigationbar = () => {
    const navigate = useNavigate(); // Use the useNavigate hook for redirection

    const handleProfileClick = () => {
        const token = localStorage.getItem('jwtToken'); // Retrieve the JWT token from local storage

        if (token) {
            try {
                // Decode the JWT token
                const decodedToken = jwtDecode<DecodedToken>(token); // Call jwtDecode as a function with type assertion
                
                // Assuming the decoded token has a role property
                if (decodedToken.role === 'admin') {
                    navigate('/admindashboard'); // Redirect to the admin dashboard
                } else {
                    navigate('/userdashboard'); // Redirect to the user dashboard
                }
            } catch (error) {
                console.error('Invalid token:', error);
                // Optionally, clear the invalid token from local storage and navigate to a login page
                localStorage.removeItem('jwtToken');
                navigate('/login');
            }
        } else {
            // Handle the case where the token is missing
            console.warn('No token found in local storage');
            navigate('/login');
        }
    };

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Drill Wheels</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <button
                        onClick={handleProfileClick}
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img
                                alt="User Profile"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

// Export the Navbar component
export default Navigationbar;
