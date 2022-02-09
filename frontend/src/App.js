import "./styles/style.css";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  ); /* (
    <div>
      <Login />
    </div>
  ); */
}

export default App;
