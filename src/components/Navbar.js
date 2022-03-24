import { Link } from "react-router-dom";
import React from "react";
import "./Navbar.css";
import Searchbar from "./Searchbar";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const { bgColor } = useTheme();

  return (
    <div className="navbar" style={{ backgroundColor: bgColor }}>
      <nav>
        <Link to="/" className="brand">
          <h1>td-Blog</h1>
        </Link>

        <Searchbar />

        <Link to="/create">Yeni Yazı</Link>
      </nav>
    </div>
  );
}
