import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import {jwtDecode } from 'jwt-decode'; // Correctly import jwt-decode

// Define the Navbar component
const Navigationbar = () => {
    const navigate = useNavigate(); // Use the useNavigate hook for redirection

    const handleProfileClick = () => {
        const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage
        if (token) {
            // Decode the JWT token
            const decodedToken = jwtDecode<{ role: string }>(token); // Call jwtDecode as a function with type assertion
            
            // Assuming the decoded token has a role property
            if (decodedToken.role === 'admin') {
                navigate('/admindashboard'); // Redirect to the admin dashboard
            } else {
                navigate('/userdashboard'); // Redirect to the user dashboard
            }
        }
    };

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Drill wheels</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <button onClick={handleProfileClick} tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="User Profile"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

// Export the Navbar component
export default Navigationbar;