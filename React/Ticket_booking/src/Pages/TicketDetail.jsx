
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./TicketDetails.css";

const TicketDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);

  // Get Ticket Details
  const getTicket = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/api/tickets/${id}`
      );

      setTicket(result.data.ticket || result.data);

    } catch (error) {
      console.log(error);
      alert("Ticket not found");
    }
  };

  useEffect(() => {
    getTicket();
  }, [id]);

  // Update Ticket Status
  const updateStatus = async (e) => {
    try {
      const result = await axios.put(
        `http://localhost:5000/api/tickets/${id}`,
        { status: e.target.value }
      );

      setTicket(result.data.ticket || result.data);

      alert("Status Updated Successfully!");

    } catch (error) {
      console.log(error);
      alert("Status Update Failed!");
    }
  };

  if (!ticket) {
    return <h3 className="loading">Loading Ticket...</h3>;
  }

  return (

    <div className="details-page">

      <div className="details-container">

        <div className="details-header">

          <div>
            <h2>Ticket Details</h2>
            <p>View and manage your support ticket</p>
          </div>

          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

        </div>

        <div className="ticket-id">
          Ticket ID: {ticket._id}
        </div>

        <div className="details-grid">

          <div className="detail-box">
            <label>Customer Name</label>
            <h3>{ticket.customerName}</h3>
          </div>

          <div className="detail-box">
            <label>Customer Email</label>
            <h3>{ticket.customerEmail}</h3>
          </div>

          <div className="detail-box">
            <label>Subject</label>
            <h3>{ticket.subject}</h3>
          </div>

          <div className="detail-box">
            <label>Priority</label>
            <span className={`priority ${ticket.priority?.toLowerCase()}`}>
              {ticket.priority}
            </span>
          </div>

          <div className="detail-box">
            <label>Created Date</label>
            <h3>
              {ticket.createdAt
                ? new Date(ticket.createdAt).toLocaleDateString()
                : "N/A"}
            </h3>
          </div>

          <div className="detail-box">
            <label>Updated Date</label>
            <h3>
              {ticket.updatedAt
                ? new Date(ticket.updatedAt).toLocaleDateString()
                : "N/A"}
            </h3>
          </div>

        </div>

        <div className="description-box">

          <label>Description</label>

          <p>{ticket.description}</p>

        </div>

        <div className="status-section">

          <label>Update Ticket Status</label>

          <select
            value={ticket.status}
            onChange={updateStatus}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

        </div>

      </div>

    </div>

  );
};

export default TicketDetails;
