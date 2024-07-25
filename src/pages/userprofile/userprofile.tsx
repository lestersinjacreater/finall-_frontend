import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode correctly
import { profileAPI } from '../../features/users/profile.api';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

interface DecodedToken {
  userId: string;
  // Add other properties from the decoded token if needed
}

const Profile = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [editProfile, setEditProfile] = useState({
    fullName: '',
    email: '',
    contactPhone: '',
    address: '',
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUserId(decoded.userId); // Assuming the decoded token contains a userId field
      } catch (err) {
        console.error('Failed to decode token:', err);
        // Handle error, e.g., redirect to login or show an error message.
      }
    } else {
      console.error('Token is null');
      // Handle the case where token is null, e.g., redirect to login or show an error message.
    }
  }, []);

  const { data: profile, error, isLoading } = profileAPI.useGetProfileQuery(userId ?? '');
  const [updateProfile, { isLoading: isUpdating }] = profileAPI.useUpdateProfileMutation();

  useEffect(() => {
    if (profile) {
      setEditProfile(profile);
    }
  }, [profile]);

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setEditProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (userId) {
      try {
        await updateProfile({ id: userId, newProfile: editProfile }).unwrap();
        setSuccessMessage('Profile edit done!'); // Set success message
      } catch (err) {
        setSuccessMessage('Failed to update profile.');
      }
    }
  };

  const handleLogout = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = '/';
  };

  if (isLoading) return <div className="text-center mt-4 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center mt-4 text-red-500">Error fetching profile</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-white">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={editProfile.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={editProfile.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Contact Phone</label>
          <input
            type="text"
            name="contactPhone"
            value={editProfile.contactPhone}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={editProfile.address}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <button
          type="submit"
          disabled={isUpdating}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 disabled:bg-blue-300"
        >
          {isUpdating ? 'Updating...' : 'Update Profile'}
        </button>
        {successMessage && (
          <div className="mt-4 text-center text-green-500">
            {successMessage}
          </div>
        )}
      </form>
      <div className="mt-6 flex space-x-4">
        <Link to="/" onClick={handleLogout} className="text-blue-500 hover:text-blue-700">Logout</Link>
        <Link to="/timeline" className="text-blue-500 hover:text-blue-700">Book a Ride</Link>
      </div>
    </div>
  );
};

export default Profile;
