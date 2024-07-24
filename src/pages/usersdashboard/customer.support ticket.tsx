import React, { useState } from 'react';
import { customerSupportAPI, CustomerSupportTicket } from '../../features/customer support tickets/customersupport.api';

const CustomerSupportTickets = () => {
  const userId = localStorage.getItem('userId'); // Assuming the user ID is stored with this key
  const { data: tickets, isLoading, isError } = customerSupportAPI.useGetTicketsByUserIdQuery(userId ? parseInt(userId) : 0);
  const [createTicket, { isLoading: isCreating, isSuccess }] = customerSupportAPI.useCreateTicketMutation();

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return; // Ensure there is a user ID
    await createTicket({ userId: parseInt(userId), subject, description });
    setSubject('');
    setDescription('');
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching tickets</div>;

  return (
    <div>
      <h2>Customer Support Tickets</h2>
      {tickets && tickets.map((ticket: CustomerSupportTicket) => (
        <div key={ticket.ticketId}>
          <h3>{ticket.subject}</h3>
          <p>{ticket.description}</p>
          <p>Status: {ticket.status}</p>
        </div>
      ))}
      <h3>Create a new ticket</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <button type="submit" disabled={isCreating}>Create Ticket</button>
      </form>
      {isSuccess && <p>Ticket created successfully!</p>}
    </div>
  );
};

export default CustomerSupportTickets;