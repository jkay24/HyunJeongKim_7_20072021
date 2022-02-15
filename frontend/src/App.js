import "./styles/style.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Signup from "./pages/login/Signup";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { AuthContext } from "./context/AuthContext";
import React, { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home/:id" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
