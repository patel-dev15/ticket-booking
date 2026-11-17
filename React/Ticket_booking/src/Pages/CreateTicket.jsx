import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateTicket.css";

const CreateTicket = () => {

  const navigate = useNavigate();

  const [cust_Name, setName] = useState("");
  const [cust_Email, setEmail] = useState("");
  const [Subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await axios.post(
        "http://localhost:6592/auth/bookticket",
        {
          cust_Name,
          cust_Email,
          Subject,
          description,
          priority
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert(result.data.message);

      // Form clear
      setName("");
      setEmail("");
      setSubject("");
      setDescription("");
      setPriority("Medium");

      // Dashboard par jao
      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Ticket creation failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-ticket-container">

      <div className="create-ticket-card">

        <h2>Create New Ticket</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Customer Name</label>
            <input
              type="text"
              placeholder="Enter customer name"
              value={cust_Name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Customer Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              value={cust_Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              placeholder="Enter ticket subject"
              value={Subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Describe your issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "+ Create Ticket"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateTicket;
