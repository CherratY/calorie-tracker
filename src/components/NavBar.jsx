import { Link, useLocation } from "react-router-dom";

import {
  FiHome,
  FiBook,
  FiBarChart2,
  FiSettings
} from "react-icons/fi";

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link
        className={location.pathname === "/" ? "active" : ""}
        to="/"
      >
        <FiHome />
        <span>Home</span>
      </Link>

      <Link
        className={location.pathname === "/diary" ? "active" : ""}
        to="/diary"
      >
        <FiBook />
        <span>Diary</span>
      </Link>

      <Link
        className={location.pathname === "/progress" ? "active" : ""}
        to="/progress"
      >
        <FiBarChart2 />
        <span>Progress</span>
      </Link>

      <Link
        className={location.pathname === "/settings" ? "active" : ""}
        to="/settings"
      >
        <FiSettings />
        <span>Settings</span>
      </Link>
    </nav>
  );
}