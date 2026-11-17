import express from "express";
import {
  GetTickets,
  Login,
  Registration,
  TicketBook,
  UpdateTicket
} from "./Auth-Controller.js";

import { VerifyToken } from "./Auth-Middleware.js";

const router = express.Router();

router.post("/register", Registration);
router.post("/login", Login);

router.post("/bookticket", VerifyToken, TicketBook);

router.put("/updateTicket/:id", VerifyToken, UpdateTicket);
router.get("/getTickets", VerifyToken, GetTickets);

export default router;