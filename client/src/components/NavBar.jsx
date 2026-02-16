import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar" style={{ padding: "10px", background: "#222", color: "white" }}>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        Code Platform
      </Link>
    </div>
  );
}

export default NavBar;
