import React, { useState } from 'react';
import { VehicleAPI, VehicleResponse } from '../../features/vehicles/vehiclesandspecifications.api';

const ManageVehicles = () => {
    const { data: vehicles, error, isLoading } = VehicleAPI.useGetVehiclesQuery();
    const [createVehicle] = VehicleAPI.useCreateVehicleMutation();
    const [updateVehicle] = VehicleAPI.useUpdateVehicleMutation();
    const [deleteVehicle] = VehicleAPI.useDeleteVehicleMutation();

    const [newVehicle, setNewVehicle] = useState({
        vehicleSpecId: 0,
        rentalRate: 0,
        availability: true,
    });

    const [editVehicle, setEditVehicle] = useState({
        vehicleId: 0,
        vehicleSpecId: 0,
        rentalRate: 0,
        availability: true,
        createdAt: '',
        updatedAt: '',
    });

    const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewVehicle((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditVehicle((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createVehicle(newVehicle).unwrap();
            alert('Vehicle created successfully!');
        } catch (err) {
            alert('Failed to create vehicle.');
        }
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedVehicle: VehicleResponse = {
                vehicleId: editVehicle.vehicleId,
                vehicleSpecId: editVehicle.vehicleSpecId,
                rentalRate: editVehicle.rentalRate,
                availability: editVehicle.availability,
                createdAt: editVehicle.createdAt,
                updatedAt: editVehicle.updatedAt,
                vehicle_specs: {
                    vehicleSpecId: 0,
                    manufacturer: '',
                    model: '',
                    year: 0,
                    fuelType: '',
                    engineCapacity: 0,
                    transmission: '',
                    seatingCapacity: 0,
                    color: '',
                    features: '',
                },
                vehicles: {
                    vehicleId: 0,
                    vehicleSpecId: 0,
                    rentalRate: 0,
                    availability: false,
                    createdAt: '',
                    updatedAt: ''
                }
            };
            await updateVehicle(updatedVehicle).unwrap();
            alert('Vehicle updated successfully!');
        } catch (err) {
            alert('Failed to update vehicle.');
        }
    };

    const handleDelete = async (vehicleId: number) => {
        try {
            await deleteVehicle(vehicleId).unwrap();
            alert('Vehicle deleted successfully!');
        } catch (err) {
            alert('Failed to delete vehicle.');
        }
    };

    if (isLoading) return <div className="text-white">Loading...</div>;
    if (error) return <div className="text-red-500">Error fetching vehicles</div>;

    return (
        <div className="bg-gray-900 text-white min-h-screen p-6">
            <h2 className="text-3xl font-bold mb-6">Manage Vehicles</h2>
            
            {/* Create Vehicle Form */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                <h3 className="text-2xl font-semibold mb-4">Create Vehicle</h3>
                <form onSubmit={handleCreateSubmit} className="space-y-4">
                    <input
                        type="number"
                        name="vehicleSpecId"
                        placeholder="Vehicle Spec ID"
                        value={newVehicle.vehicleSpecId}
                        onChange={handleCreateChange}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                    />
                    <input
                        type="number"
                        name="rentalRate"
                        placeholder="Rental Rate"
                        value={newVehicle.rentalRate}
                        onChange={handleCreateChange}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                    />
                    <label className="flex items-center text-lg">
                        <input
                            type="checkbox"
                            name="availability"
                            checked={newVehicle.availability}
                            onChange={(e) => setNewVehicle((prev) => ({ ...prev, availability: e.target.checked }))}
                            className="mr-2 bg-gray-700 border border-gray-600 rounded-md"
                        />
                        Availability
                    </label>
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">Create Vehicle</button>
                </form>
            </div>

            {/* Vehicles List */}
            <h3 className="text-2xl font-semibold mb-4">Vehicles List</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles?.map((vehicle) => (
                    <div key={vehicle.vehicleId} className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center">
                        <div>
                            <h4 className="text-lg font-semibold">Vehicle ID: {vehicle.vehicleId}</h4>
                            <p>Rental Rate: ${vehicle.rentalRate}</p>
                            <p>Status: {vehicle.availability ? 'Available' : 'Not Available'}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={() => setEditVehicle(vehicle)} className="bg-yellow-600 text-white px-4 py-1 rounded-md hover:bg-yellow-700 transition">Edit</button>
                            <button onClick={() => handleDelete(vehicle.vehicleId)} className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Vehicle Form */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
                <h3 className="text-2xl font-semibold mb-4">Edit Vehicle</h3>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                    <input
                        type="number"
                        name="vehicleSpecId"
                        placeholder="Vehicle Spec ID"
                        value={editVehicle.vehicleSpecId}
                        onChange={handleEditChange}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                    />
                    <input
                        type="number"
                        name="rentalRate"
                        placeholder="Rental Rate"
                        value={editVehicle.rentalRate}
                        onChange={handleEditChange}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                    />
                    <label className="flex items-center text-lg">
                        <input
                            type="checkbox"
                            name="availability"
                            checked={editVehicle.availability}
                            onChange={(e) => setEditVehicle((prev) => ({ ...prev, availability: e.target.checked }))}
                            className="mr-2 bg-gray-700 border border-gray-600 rounded-md"
                        />
                        Availability
                    </label>
                    <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">Update Vehicle</button>
                </form>
            </div>
        </div>
    );
};

export default ManageVehicles;
