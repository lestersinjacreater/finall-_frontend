
import {  TUser, usersAPI } from '../../features/users/user.api'; // Adjust the import path as necessary


const ManageUsers = () => {
  const { data: users, isLoading, isError } = usersAPI.useGetUsersQuery();
  const [createUser] = usersAPI.useCreateUserMutation();
  const [updateUser] = usersAPI.useUpdateUserMutation();
  const [deleteUser] = usersAPI.useDeleteUserMutation();
  

  const handleCreateUser = async (user: Partial<TUser>) => {
    await createUser(user).unwrap();
  };

  const handleUpdateUser = async (user: Partial<TUser & { id: number; }>) => {
    await updateUser(user).unwrap();
  };

  const handleDeleteUser = async (userId: number) => {
    await deleteUser(userId).unwrap();
  };

  if (isLoading) return <div>Loading users...</div>;
  if (isError || !users) return <div>Failed to load users</div>;

  return (
    <div>
      <h2>Manage Users</h2>
      {/* Implement UI for creating a new user */}
      <button onClick={() => handleCreateUser({ /* user data */ })}>Add User</button>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user.userId}>
              <p>Name: {user.full_Name}</p>
              <p>Email: {user.email}</p>
              {/* Display other user details as needed */}
              <button onClick={() => handleUpdateUser({ ...user, /* updated data */ })}>Edit</button>
              <button onClick={() => handleDeleteUser(user.userId)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default ManageUsers;