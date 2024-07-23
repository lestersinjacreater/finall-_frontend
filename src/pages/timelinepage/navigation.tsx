import { Link } from "react-router-dom"; // Import the Link component from react-router-dom for navigation

// Define the Navbar component
const Navigationbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <Link to="/userdashboard" tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="User Profile"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

// Export the Navbar component
export default Navigationbar;