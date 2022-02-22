import "./noPosts.scss";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

export default function noPosts() {
  return <div className="noPosts">Pas de poste pour le moment...</div>;
}
