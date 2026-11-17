
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
const API = "http://localhost:5000/api/tickets";

const Dashboard = () => {

  const navigate = useNavigate();
  const [selectedTicket, setSelectedTicket] = useState(null);


  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  // GET ALL TICKETS
const getTickets = async () => {
  try {

    const result = await axios.get(
      "http://localhost:6592/auth/getTickets",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    setTickets(result.data.tickets || []);

  } catch (error) {

    console.log(error);
    alert("Unable to load tickets");

  } finally {

    setLoading(false);

  }
};

  useEffect(() => {
    getTickets();
  }, []);

  // DELETE TICKET
  const deleteTicket = async (id) => {

    if (!window.confirm("Delete this ticket?")) return;

    try {
      const result = await axios.delete(
        `${API}/${id}`,
        config
      );

      alert(result.data.message);

      getTickets();

    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  // UPDATE STATUS
  
const updateStatus = async (id, status) => {
  try {

    const result = await axios.put(
      `http://localhost:6592/auth/updateTicket/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    alert(result.data.message);

    getTickets();

  } catch (error) {

    console.log(error);
    alert(
      error.response?.data?.message || "Status Update Failed!"
    );

  }
};


  // DASHBOARD COUNTS
  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    ticket => ticket.status === "Open"
  ).length;

  const progressTickets = tickets.filter(
    ticket => ticket.status === "In Progress"
  ).length;

  const resolvedTickets = tickets.filter(
    ticket => ticket.status === "Resolved"
  ).length;

  // FILTER
  const filteredTickets = tickets.filter(ticket => {
    if (filter === "All") return true;
    return ticket.status === filter;
  });

  // LOGOUT
const logout = () => {
  localStorage.clear();
  navigate("/login", { replace: true });
};

  return (

    <div className="dashboard">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>
          <h2>Support Dashboard</h2>
          <p>Manage and track all your support tickets.</p>
        </div>

        <div className="header-buttons">

          <button
            className="create-btn"
            onClick={() => navigate("/createTicket")}
          >
            + Create Ticket
          </button>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>


      {/* SUMMARY CARDS */}

      <div className="summary-cards">

        <div className="summary-card total">
          <h4>Total Tickets</h4>
          <h2>{totalTickets}</h2>
          <span>All Tickets</span>
        </div>

        <div className="summary-card open">
          <h4>Open Tickets</h4>
          <h2>{openTickets}</h2>
          <span>Waiting for action</span>
        </div>

        <div className="summary-card progress">
          <h4>In Progress</h4>
          <h2>{progressTickets}</h2>
          <span>Currently working</span>
        </div>

        <div className="summary-card resolved">
          <h4>Resolved</h4>
          <h2>{resolvedTickets}</h2>
          <span>Completed tickets</span>
        </div>

      </div>


      {/* TICKET LIST */}

      <div className="ticket-list">

        <div className="list-header">

          <div>
            <h3>Recent Tickets</h3>
            <p>Manage your customer support requests</p>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Tickets</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

        </div>


        {loading ? (

          <h3 className="loading-text">
            Loading Tickets...
          </h3>

        ) : (

          <div className="table-responsive">

            <table>

              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Customer</th>
                  <th>Subject</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Created Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredTickets.length > 0 ? (

                  filteredTickets.map((ticket) => (

                    <tr key={ticket.id}>

                      <td>
                        #{ticket.id}
                      </td>

                      <td>
                        {ticket.customerName}
                      </td>

                      <td>
                        {ticket.subject}
                      </td>

                      <td>
                        <span className={`priority-badge ${(ticket.priority || "Medium").toLowerCase()}`}>
                          {ticket.priority || "Medium"}
                        </span>
                      </td>

                      <td>

                        <select
                          className="status-select"
                          value={ticket.status || "Open"}
                          onChange={(e) =>
                            updateStatus(
                              ticket.id,
                              e.target.value
                            )
                          }
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>

                      </td>

                      <td>
                        {ticket.createdAt
                          ? new Date(ticket.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td>

                        <div className="action-buttons">

                         <button onClick={() => setSelectedTicket(ticket)}>View</button>
                          <button
                            className="delete-btn"
                            onClick={() =>
                              deleteTicket(ticket.id)
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td colSpan="7" className="no-data">
                      No Tickets Found
                    </td>
                  </tr>

                )}

              </tbody>

            </table>
{selectedTicket && (
  <div className="view-modal">
    <div className="view-modal-content">

      <h2>Ticket Details</h2>

      <p><b>Customer Name:</b> {selectedTicket.customerName}</p>
      <p><b>Email:</b> {selectedTicket.customerEmail}</p>
      <p><b>Subject:</b> {selectedTicket.subject}</p>
      <p><b>Description:</b> {selectedTicket.description}</p>
      <p><b>Priority:</b> {selectedTicket.priority}</p>
      <p><b>Status:</b> {selectedTicket.status}</p>
      <p><b>Created Date:</b> {selectedTicket.createdAt}</p>

      <button onClick={() => setSelectedTicket(null)}>
        Close
      </button>

    </div>
  </div>
)}
          </div>

        )}

      </div>

    </div>
  );
};

export default Dashboard;
