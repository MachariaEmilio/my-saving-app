import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/websitepage/Home/home";
import Dashboard from "./pages/dashboard/home/Dashboard.jsx";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/DashBoard" element={<Dashboard />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
