
import { Location, locationAPI } from '../../features/locations/locations.api'; // Adjust the import path as necessary


const ManageLocations = () => {

  const [createLocation] = locationAPI.useCreateLocationMutation();
  const [updateLocation] = locationAPI.useUpdateLocationMutation();

  const handleCreateLocation = async (location: { name: string; address: string; contactPhone?: string | undefined; }) => {
    const { name, address, contactPhone = '' } = location; // Provide a default value for contactPhone if it is undefined
    await createLocation({ name, address, contactPhone }).unwrap();
  };

  const handleUpdateLocation = async (location: Location) => {
    await updateLocation(location).unwrap();
  };

  // Example of fetching a location by ID, adjust as needed
  const { data: location, isLoading, isError } = locationAPI.useGetLocationByIdQuery(1); // Example ID

  if (isLoading) return <div>Loading location...</div>;
  if (isError || !location) return <div>Failed to load location</div>;

  return (
    <div>
      <h2>Manage Locations</h2>
      {/* Implement UI for creating a new location */}
      <button onClick={() => handleCreateLocation}>Add Location</button>
      {/* Example of displaying a location, adjust as needed */}
      <div>
        <p>Name: {location.name}</p>
        <p>Address: {location.address}</p>
        {/* Display other location details as needed */}
        <button onClick={() => handleUpdateLocation({ ...location, /* updated data */ })}>Edit Location</button>
      </div>
    </div>
  );
};

export default ManageLocations;