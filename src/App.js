import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { BrowserRouter } from "react-router-dom";
// importing components from react-router package
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Login component
import Login from "./components/auth/login";
// import Register component
import Register from "./components/auth/register";
import MainUI from "./components/main";
import CheckSignIn from "./components/auth/checklogin";
import Verify from "./components/auth/verify";
import Logout from "./components/auth/logout";
import Navbar from "./components/frontend/Navbar";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        {/* <AppBar position="relative">
            <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
            Virtual Stacks
            </Typography>
            </Toolbar>
        </AppBar> */}
        <Navbar />

        <Routes>
          <Route exact path="/" element={<CheckSignIn />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/main" element={<MainUI />} />
        </Routes>
      </BrowserRouter>
    </DndProvider>
  );
}

export default App;