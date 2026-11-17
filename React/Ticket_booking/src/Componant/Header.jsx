import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import CreateTicket from "../Pages/CreateTicket";
import Login from "../Pages/Login";
import TicketDetail from "../Pages/TicketDetail";
import SignUp from "../Pages/SignUp";

const Header = ()=>{
    return(
        <>
<Routes>

    <Route path="/" element={<Dashboard/>}></Route>
    <Route path="/createTicket" element={<CreateTicket/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/ticketDetails" element={<TicketDetail/>}></Route>
    <Route path="/signup" element={<SignUp/>}></Route>
    
</Routes>
        
        </>
    )
}

export default Header