import React, { useState } from 'react';
import { notificationsAPI } from '../../features/notifications/notifications.api'; // Adjust the import path as necessary

const NotificationForm = () => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [createNotification, { isLoading, isSuccess, isError }] = notificationsAPI.useCreateNotificationMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId || !message) return;
    await createNotification({ userId: Number(userId), message });
    setUserId('');
    setMessage('');
  };

  return (
    <div>
      <h2>Create Notification</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">User ID:</label>
          <input
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            type="number"
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>Create Notification</button>
      </form>
      {isSuccess && <p>Notification created successfully!</p>}
      {isError && <p>Error creating notification.</p>}
    </div>
  );
};

export default NotificationForm;