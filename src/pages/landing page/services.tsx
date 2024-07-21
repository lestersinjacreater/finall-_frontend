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
                    <h3 className="font-bold text-lg">Service 1</h3>
                    <p>Description of Service 1.</p>
                </div>
                <div className="m-4 p-4 bg-gray-200 rounded-lg shadow-md w-1/4"> {/* Adjust width as needed */}
                    <h3 className="font-bold text-lg">Service 2</h3>
                    <p>Description of Service 2.</p>
                </div>
                <div className="m-4 p-4 bg-gray-200 rounded-lg shadow-md w-1/4"> {/* Adjust width as needed */}
                    <h3 className="font-bold text-lg">Service 3</h3>
                    <p>Description of Service 3.</p>
                </div>
                <div className="m-4 p-4 bg-gray-200 rounded-lg shadow-md w-1/4"> {/* Adjust width as needed */}
                    <h3 className="font-bold text-lg">Service 4</h3>
                    <p>Description of Service 4.</p>
                </div>
            </div>
        </div>
    );
};

export default Services;