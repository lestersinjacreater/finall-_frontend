// import React from 'react';
// import { VehicleAPI } from '../../features/vehicles/vehiclesandspecifications.api'; // Adjust the import path as necessary
// import { useHistory } from 'react-router-dom';

// // Assuming you're using react-router v6 or above
// import { useNavigate } from 'react-router-dom';

// // Assuming you're using react-router v5 or below
// // import { useHistory } from 'react-router-dom';

// const Vehicles = () => {
//   const { data: vehicles, isLoading, isError } = VehicleAPI.useGetVehiclesQuery();
//   const history = useHistory();

//   const handleSelectVehicle = (vehicleId: number, rentalRate: number) => {
//     localStorage.setItem('selectedVehicleId', vehicleId.toString());
//     localStorage.setItem('selectedVehicleRentalRate', rentalRate.toString());
//     history.push('/booking-form'); // Adjust the path as necessary
//   };

//   if (isLoading) return <div>Loading vehicles...</div>;
//   if (isError || !vehicles) return <div>Failed to load vehicles</div>;

//   return (
//     <div>
//       <h2>Vehicles</h2>
//       {vehicles.length > 0 ? (
//         <ul>
//           {vehicles.map(({ vehicles }) => (
//             <li key={vehicles.vehicleId}>
//               <p>ID: {vehicles.vehicleId}</p>
//               <p>Rate: {vehicles.rentalRate}</p>
//               <p>Availability: {vehicles.availability ? 'Available' : 'Not Available'}</p>
//               {/* Add more vehicle details as needed */}
//               <button onClick={() => handleSelectVehicle(vehicles.vehicleId, vehicles.rentalRate)}>
//                 Select Vehicle
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No vehicles found</p>
//       )}
//     </div>
//   );
// };

// export default Vehicles;