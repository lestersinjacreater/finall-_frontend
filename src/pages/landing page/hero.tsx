
import { Link } from 'react-router-dom'; // Importing Link for navigation
import { RootState } from '../../app/store'; // Importing RootState type for TypeScript
import image23 from '../../assets/images/image 23.png'; // Importing background image for the hero section
import { useSelector } from 'react-redux'; // Importing useSelector to access Redux state

const Hero = () => {
    const user = useSelector((state: RootState) => state.user); // Accessing user state from Redux store
    console.log("from Hero", user.user?.role); // Logging the user's role for debugging

    const name = user.user?.name; // Extracting the user's name from the state
    return (
        <div
            className="hero h-full lg:h-screen" // Hero section with full height on small screens and screen height on large screens
            style={{
                backgroundImage: `url(${image23})`, // Setting the background image
                backgroundSize: 'cover', // Covering the entire hero area with the image
                backgroundPosition: 'center', // Centering the background image
            }}
        >
            <div className="hero-overlay bg-opacity-10 rounded-lg"></div> {/* Overlay for darkening the background */}
            <div className="hero-content text-neutral-content text-center"> {/* Centered content within the hero section */}
                <div>
                    <h1 className="mb-5 text-3xl lg:text-5xl font-bold text-white "> {/* Main heading */}
                        Discover the world on wheels with <br/> our car rental service
                        <span className='text-webcolor'>
                            {name ? ` ${name}` : ''} {/* Displaying the user's name if available */}
                        </span>
                    </h1>
                    {/* Uncomment below for additional description */}
                    {/* <p className="mb-5">
                        Rent a car from our extensive range of vehicles. We have every type of car available to meet your needs. <br />
                        We offer affordable Pricing to our Customers
                    </p> */}
                    <Link to="/dashboard/vehicles" className="btn bg-black text-text-light hover:text-black border-none">GET A RIDE</Link> {/* Button linking to vehicle dashboard */}
                    {/* Uncomment below for an additional button */}
                    {/* <button className="btn bg-webcolor text-text-light hover:text-black border-none">Book a Ride</button> */}
                </div>
            </div>
        </div>
    );
}

export default Hero; // Exporting Hero component
