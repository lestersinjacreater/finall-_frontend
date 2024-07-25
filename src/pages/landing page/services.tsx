const Services = () => {
    return (
        <div className="container mx-auto py-10 h-screen flex flex-col items-center"> {/* Set height to full screen and use flexbox for vertical alignment */}
            <div className="text-center mb-10"> {/* Center the heading and paragraph */}
                <h2 className="font-bold text-xl md:text-4xl text-webcolor">Our Services and Benefits</h2>
                <p className="text-lg mt-5 px-6 lg:px-0">
                    To make renting easy and hassle-free, we provide a variety of services and advantages.<br /> We have you covered with a variety of vehicles and flexible rental terms.
                </p>
            </div>

            {/* Flexbox container for subsequent divs */}
            <div className="flex flex-wrap justify-center w-full"> {/* Use flexbox to arrange items horizontally */}
                {/* Example Service Divs */}
                <div className="m-4 p-4 bg-gray-200 rounded-lg shadow-md w-1/4"> {/* Adjust width as needed */}
                    <h3 className="font-bold text-lg">Short-Term Rentals</h3>
                    <p>Renting vehicles for short durations, ranging from a few hours to a few days. This is ideal for tourists, business travelers, or individuals who need a car for a temporary period.</p>
                </div>
                <div className="m-4 p-4 bg-gray-200 rounded-lg shadow-md w-1/4"> {/* Adjust width as needed */}
                    <h3 className="font-bold text-lg">Long-Term Rentals:</h3>
                    <p>Offering vehicle rentals for extended periods, such as weeks, months, or even years. This service is suitable for individuals who need a vehicle for a longer duration but do not want to commit to purchasing a car.</p>

                </div>
                <div className="m-4 p-4 bg-gray-200 rounded-lg shadow-md w-1/4"> {/* Adjust width as needed */}
                    <h3 className="font-bold text-lg">Chauffeur Services: </h3>
                    <p>Offering vehicle rentals for extended periods, such as weeks, months, or even years. This service is suitable for individuals who need a vehicle for a longer duration but do not want to commit to purchasing a car.</p>

                </div>
                
            </div>
        </div>
    );
};

export default Services;