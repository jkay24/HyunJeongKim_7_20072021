import "./noPosts.scss";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

export default function noPosts() {
  return <div className="noPosts">Aucune publication pour le moment...</div>;
}
