import "../home/home.css";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  return (
    <div className="homeContainer">
      <Topbar />
      <Feed />
    </div>
  );
}
