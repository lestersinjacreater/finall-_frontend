// src/components/Sidebar.tsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom'; // Import Outlet for nested routing

const Sidebar: React.FC = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                    Open drawer
                </label>
                <Outlet /> {/* Render matched child route components here */}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li><Link to="/bookinghistory">TOTAL BOOKINGS</Link></li>
                    <li><Link to="/managevehicles">MANAGE VEHICLES</Link></li>
                    <li><Link to="/manageusers">MANAGE USERS</Link></li>
                    <li><Link to="/reports">REPORTS</Link></li>
                    <li><Link to="/locations">MANAGE LOCAIONS AND BRANCHES</Link></li>
                    <li><Link to="/reports">REPORTS</Link></li>
                    <li><Link to="/notifications">CUSTOMER SUPPORT TICKETS</Link></li>
                    <li><Link to="/notifications">FLEET MANAGEMENT</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;