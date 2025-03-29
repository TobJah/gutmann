import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import Network from "./pages/Network";
import Insights from "./pages/Insights";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow p-4 flex gap-4">
          <NavLink to="/" className="font-semibold text-lg" end>
            Gutmann-Network
          </NavLink>
          <NavLink to="/insights" className="font-semibold text-lg">
            Real Time Insights
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Network />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </div>
    </Router>
  );
}
