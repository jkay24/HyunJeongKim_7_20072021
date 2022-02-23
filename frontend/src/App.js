import "./styles/style.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/login/Signup";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { AuthContext } from "./context/AuthContext";
import React, { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate replace to="/home" /> : <Signup />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={user ? <Navigate replace to="/home" /> : <Login />}
          />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
