
import { Link } from "react-router-dom" // Import the Link component from react-router-dom for navigation
// Define the Navbar component
const Navbar = () => {
    return (
        // Main container for the navbar with base styling
        <div className="navbar bg-base-100">
            {/* Container for the left side of the navbar */}
            <div className="navbar-start">
                {/* Dropdown menu for mobile view */}
                <div className="dropdown">
                    {/* Button to toggle the dropdown menu */}
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        {/* SVG icon for the dropdown button */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    {/* Dropdown menu content */}
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>WHY CHOOSE US</a></li> {/* Menu item 1 */}
                        <li>
                            <a>AVAILABLE VEHICLES</a> {/* Parent menu item */}
                            <ul className="p-2"> {/* Submenu */}
                                <li><a>AVAILABLE BRANDS</a></li> {/* Submenu item 1 */}
                                <li><a>AVAILABLE BODY TYPES</a></li> {/* Submenu item 2 */}
                            </ul>
                        </li>
                        <li><a>HOW WE WORK</a></li> {/* Menu item 3 */}
                    </ul>
                </div>
                {/* Brand name or logo */}
                <a className="btn btn-ghost text-xl text-white ">DRILL WHEELS</a>
            </div>
            {/* Container for the center of the navbar, hidden on small screens */}
            <div className="navbar-center hidden lg:flex">
                {/* Horizontal menu for larger screens */}
                <ul className="menu menu-horizontal px-1 text-white">
                    <li><a>WHY CHOOSE US</a></li> {/* Menu item 1 */}
                    <li>
                        <details> {/* Parent menu item with details for dropdown */}
                            <summary>AVAILABLE VEHICLES</summary>
                            <ul className="p-2"> {/* Submenu */}
                                <li><a>AVAILABLE BRANDS</a></li> {/* Submenu item 1 */}
                                <li><a>AVAILABLE BODY TYPES</a></li> {/* Submenu item 2 */}
                            </ul>
                        </details>
                    </li>
                    <li><a>HOW WE WORK</a></li> {/* Menu item 3 */}
                </ul>
            </div>
            {/* Container for the right side of the navbar */}
            <div className="navbar-end">
                {/* Button on the right side */}
                <Link to="/register" className="btn text-white">REGISTER</Link>
                <Link to="/login" className="btn text-white">LOGIN</Link>

            </div>
        </div>
    )
}

export default Navbar // Export the Navbar component as the default export