import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import the login and registration API hooks
import { loginAPI } from '../../features/authentication/login.api'; // Adjust the import path accordingly
import { registerAPI } from '../../features/authentication/register.api'; // Adjust the import path accordingly

interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    placeholder: string;
    required: boolean;
}

const InputField = ({ label, type, name, placeholder, required }: InputFieldProps) => (
    <div className="mb-4">
        <label className="block text-gray-700">{label}</label>
        <input type={type} name={name} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-webcolor" placeholder={placeholder} required={required} />
    </div>
);

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const [isRegisterVisible, setIsRegisterVisible] = useState(false);
    const [loginUser, { isLoading: isLoginLoading, error: loginError }] = loginAPI.useLoginUserMutation();
    const [registerUser, { isLoading: isRegisterLoading, error: registerError }] = registerAPI.useRegisterUserMutation();

    const handleLoginClick = () => {
        setIsLoginVisible(true);
        setIsRegisterVisible(false);
    };

    const handleRegisterClick = () => {
        setIsRegisterVisible(true);
        setIsLoginVisible(false);
    };

    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;

        try {
            const response = await loginUser({ email, password }).unwrap();
            console.log('Login successful:', response);

            // Store the token and user ID in local storage
            localStorage.setItem('jwtToken', response.token);
            localStorage.setItem('userId', response.userId);

            setIsLoginVisible(false);

            // Navigate to the timeline page
            navigate('/timeline');
        } catch (err) {
            console.error('Failed to login:', err);
        }
    };

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fullName = e.currentTarget.fullName.value;
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;

        try {
            const response = await registerUser({ fullName, email, password }).unwrap();
            console.log('Registration successful:', response);

            // Automatically log in after successful registration
            localStorage.setItem('jwtToken', response.token);
            localStorage.setItem('userId', response.userId);

            setIsRegisterVisible(false);
            setIsLoginVisible(false);

            // Navigate to the timeline page
            navigate('/timeline');
        } catch (err) {
            console.error('Failed to register:', err);
        }
    };

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target instanceof HTMLElement && e.target.classList.contains('modal-background')) {
            setIsLoginVisible(false);
            setIsRegisterVisible(false);
        }
    };

    return (
        <div>
            <nav className="navbar bg-base-100 shadow-lg">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><Link to="/">WHY CHOOSE US</Link></li>
                            <li>
                                <Link to="/">AVAILABLE VEHICLES</Link>
                                <ul className="p-2">
                                    <li><Link to="/">AVAILABLE BRANDS</Link></li>
                                    <li><Link to="/">AVAILABLE BODY TYPES</Link></li>
                                </ul>
                            </li>
                            <li><Link to="/">HOW WE WORK</Link></li>
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost text-xl text-white">DRILL WHEELS</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal space-x-4">
                        <li><Link to="/">WHY CHOOSE US</Link></li>
                        <li className="relative group">
                            <Link to="/">AVAILABLE VEHICLES</Link>
                            <ul className="absolute left-0 top-full hidden bg-base-100 shadow-lg group-hover:block p-2 rounded-lg z-10">
                                <li><Link to="/">AVAILABLE BRANDS</Link></li>
                                <li><Link to="/">AVAILABLE BODY TYPES</Link></li>
                            </ul>
                        </li>
                        <li><Link to="/">HOW WE WORK</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <button onClick={handleRegisterClick} className="btn bg-bl text-white mr-2">REGISTER</button>
                    <button onClick={handleLoginClick} className="btn text-white">LOGIN</button>
                </div>
            </nav>

            {/* Login Modal */}
            {isLoginVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 modal-background" onClick={handleModalClick}>
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Login</h2>
                        <form onSubmit={handleLoginSubmit}>
                            <InputField label="Email Address" type="email" name="email" placeholder="Email" required />
                            <InputField label="Password" type="password" name="password" placeholder="Password" required />
                            <button type="submit" className="btn bg-black text-white w-full" disabled={isLoginLoading}>
                                {isLoginLoading ? 'Logging in...' : 'Login'}
                            </button>
                            {loginError && <p className="text-red-500 mt-2">{(loginError as any).data.message}</p>}
                        </form>
                    </div>
                </div>
            )}

            {/* Registration Modal */}
            {isRegisterVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 modal-background" onClick={handleModalClick}>
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Register</h2>
                        <form onSubmit={handleRegisterSubmit}>
                            <InputField label="Full Name" type="text" name="fullName" placeholder="Full Name" required />
                            <InputField label="Email Address" type="email" name="email" placeholder="Email" required />
                            <InputField label="Password" type="password" name="password" placeholder="Password" required />
                            <button type="submit" className="btn bg-black text-white w-full" disabled={isRegisterLoading}>
                                {isRegisterLoading ? 'Registering...' : 'Register'}
                            </button>
                            {registerError && <p className="text-red-500 mt-2">{(registerError as any).data.message}</p>}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
