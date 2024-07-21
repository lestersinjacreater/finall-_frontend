
const Steps = () => {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center"> {/* Changed background to white */}
        {/* Centered title and description */}
        <div className="text-center mb-10">
          <h1 className="text-black text-xl md:text-4xl font-bold py-4">How it works</h1> {/* Changed text color to black */}
          <p className="text-lg px-6 text-black"> {/* Changed text color to black */}
            Renting a luxury car has never been easier. Our streamlined process makes it simple for <br /> you to book and confirm your vehicle of choice online.
          </p>
        </div>
  
        {/* Steps to rent a car */}
        <div className="flex flex-col md:flex-row md:justify-start w-full md:items-start">
          <div className="md:mr-20 w-full md:w-auto md:ml-10"> {/* Left margin for larger screens */}
            <div className="mt-10 mb-10 bg-gray-200 p-4 rounded-lg border border-gray-300"> {/* Changed background to gray-200 */}
              <h3 className="text-black text-xl md:text-4xl font-bold md:text-left py-4">Browse and select</h3>
              <p className="text-lg md:text-left text-black"> {/* Changed text color to black */}
                Choose from our wide range of premium cars, select <br /> the pickup and return dates and locations that suit you best.
              </p>
            </div>
  
            <div className="mt-10 mb-10 bg-gray-200 p-4 rounded-lg border border-gray-300"> {/* Changed background to gray-200 */}
              <h2 className="text-black text-xl md:text-4xl font-bold md:text-left py-4">Book and confirm</h2>
              <p className="text-lg md:text-left text-black"> {/* Changed text color to black */}
                Book your desired car with just a few clicks and receive <br /> an instant confirmation via email or SMS.
              </p>
            </div>
  
            <div className="mt-10 mb-10 bg-gray-200 p-4 rounded-lg border border-gray-300"> {/* Changed background to gray-200 */}
              <h2 className="text-black text-xl md:text-4xl font-bold md:text-left py-4">Enjoy your ride</h2>
              <p className="text-lg md:text-left text-black"> {/* Changed text color to black */}
                Pick up your car at the designated location and enjoy <br /> your premium driving experience with our top-quality <br /> service.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Steps;
  