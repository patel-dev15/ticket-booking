import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const Registration = async (req, res) => {
    try {
        let { email, password } = req.body;

let hashPassword = await bcrypt.hash(password, 10);

let query = "INSERT INTO users (email, password) VALUES (?, ?)";

let [cmd] = await db.query(query, [email, hashPassword]);

        res.status(201).json({
            message: "Registration Successfully",
            data: cmd
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// >>>>>>>Login
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter both fields"
      });
    }

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const user = rows[0];

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid Password"
      });
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      "codewithayan",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "User Login Successful",
      token: accessToken
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};


// Ticket Book Api


// export const TicketBook = async(req,res)=>{
//     try {
//         const {cust_Name,cust_Email,Subject,description} = req.body
//         let cmd = "insert into tickets (customerName,customerEmail,subject,description) values (?,?,?,?)"
//         let [quary] = await db.query(cmd,[cust_Name,cust_Email,Subject,description])
//         if(quary.affectedRows>0){
//             res.json({
//                 message:"ticket book successfully"
//             })
//         }
//     } catch (error) {
//      console.log(error);
//     }
// }



// CREATE TICKET
export const TicketBook = async (req, res) => {
  try {
    const {
      cust_Name,
      cust_Email,
      Subject,
      description,
      priority
    } = req.body;

    if (!cust_Name || !cust_Email || !Subject ||
        !description || !priority) {
      return res.status(400).json({
        message: "Please fill all fields"
      });
    }

    const [result] = await db.query(
      `INSERT INTO tickets
      (customerName, customerEmail, subject, description, priority, status)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        cust_Name,
        cust_Email,
        Subject,
        description,
        priority,
        "Open"
      ]
    );

    return res.status(201).json({
      message: "Ticket created successfully",
      ticketId: result.insertId
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Ticket creation failed"
    });
  }
};


// GET ALL TICKETS
export const GetTickets = async (req, res) => {
  try {
    const [tickets] = await db.query(
      "SELECT * FROM tickets ORDER BY id DESC"
    );

    return res.json({ tickets });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to fetch tickets"
    });
  }
};

// Update api


export const UpdateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required"
      });
    }

    const [result] = await db.query(
      "UPDATE tickets SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Ticket not found"
      });
    }

    return res.status(200).json({
      message: "Ticket status updated successfully"
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Status update failed"
    });
  }
};
