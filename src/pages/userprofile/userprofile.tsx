import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
import { profileAPI } from '../../features/users/profile.api';
import { Link } from 'react-router-dom'; // Import Link fro'; // Adjust the import path as necessary

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
        alert('Profile updated successfully!');
      } catch (err) {
        alert('Failed to update profile.');
      }
    }
  };
const handleLogout = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = '/';
};
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching profile</div>;

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={editProfile.fullName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={editProfile.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contact Phone</label>
          <input
            type="text"
            name="contactPhone"
            value={editProfile.contactPhone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={editProfile.address}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
      <div>
        <Link to="/"  onClick={handleLogout}>Logout</Link>
      </div>
    </div>
  );
};

export default Profile;