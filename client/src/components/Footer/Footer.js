import React from "react";
import "./Footer.css";

import { useGlobal } from "../../context/globalContext";

function Footer() {
  const { user } = useGlobal();
  return (
    <div className="footer">
      <h2>🚀 Made by Arushi </h2>
      <h2>{user?.email}</h2>
    </div>
  );
}

export default Footer;
