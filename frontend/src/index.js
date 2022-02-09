import React from "react";
import ReactDOM from "react-dom";
import "./styles/style.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
