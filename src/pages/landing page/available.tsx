
import { CardData } from "../../components/cardData/CardData"; // Importing card data

const Card = () => {
    return (
        <div className="min-h-screen bg-black pt-10 px-10"> {/* Main container with black background, top padding, and horizontal padding */}
            <h1 className="text-2xl font-bold text-left text-white mb-5">Available Brands</h1> {/* Title at the top left in white */}
            <div className="grid grid-cols-6 gap-4 justify-center"> {/* Grid container for cards with centered justification */}
                {CardData.slice(0, 12).map((data, index) => ( // Map over the first 12 cards
                    <div key={index} className="card bg-white shadow-xl w-40 h-40"> {/* Individual card with white background and square dimensions */}
                        <figure className="h-24"> {/* Image container with fixed height */}
                            <img src={data.image} alt={data.name} className="object-cover w-full h-full" /> {/* Card image with cover */}
                        </figure>
                        <div className="card-body flex flex-col justify-between items-start h-16"> {/* Card body with adjusted height */}
                            <h2 className="card-title text-base"> {/* Reduced font size for title */}
                                {data.name} {/* Card title */}
                            </h2>
                            {/* Uncomment below for price display */}
                            {/* <p>Price: Ksh.{data.price}</p> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Card; // Exporting Card component
