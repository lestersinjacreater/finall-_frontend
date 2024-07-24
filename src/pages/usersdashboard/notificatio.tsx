
import { notificationsAPI } from '../../features/notifications/notifications.api';

const Notifications = () => {
  const userId = localStorage.getItem('userId'); // Assuming the user ID is stored with this key
  const { data: notifications, isLoading, isError } = notificationsAPI.useGetNotificationsByUserIdQuery(userId ? parseInt(userId) : 0);

  if (isLoading) return <div>Loading notifications...</div>;
  if (isError || !notifications) return <div>Failed to load notifications</div>;

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map(notification => (
            <li key={notification.notificationId}>
              <p>{notification.message}</p>
              <p>Status: {notification.readStatus ? 'Read' : 'Unread'}</p>
              <p>Updated at: {notification.updatedAt}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications found</p>
      )}
    </div>
  );
};

export default Notifications;