import { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const {user, logOut} = use(AuthContext)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

useEffect(() => {
  document.querySelector("html").setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}, [theme]);

const toggleTheme = () => {
  setTheme(theme === "light" ? "dark" : "light");
};

  // Logout handler
  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged out successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Logout failed!",
          text: error.message,
        });
      });
  };

  // Navigation links
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold"
              : "hover:text-primary transition-colors"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold"
              : "hover:text-primary transition-colors"
          }
        >
          All Courses
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-course"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold"
              : "hover:text-primary transition-colors"
          }
        >
          Add Course
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-course"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold"
              : "hover:text-primary transition-colors"
          }
        >
          My Course
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-6 sticky top-0 z-50">
      {/* Left Section */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            aria-label="Open Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>

          {/* Mobile menu */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
            {user ? (
              <li className="mt-2">
                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-error btn-sm w-full"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="mt-2">
                <Link
                  to="/auth/login"
                  className="btn btn-outline btn-primary btn-sm w-full"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Brand Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-primary ml-2 hover:opacity-90"
        >
          Learnify
        </Link>
      </div>

      {/* Center Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end flex items-center gap-3">
        {user ? (
          // User logged in
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    user.photoURL ||
                    "https://i.ibb.co/2d3vYvZ/default-avatar.png"
                  }
                  alt="User Avatar"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-48"
            >
              <li>
                <span className="justify-between text-sm font-semibold">
                  {user.displayName || "User"}
                </span>
              </li>
              <li>
                <Link to="/courses/my-course">My Course</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-error">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          // Not logged in
          <Link
            to="/auth/login"
            className="btn btn-outline btn-primary btn-sm hidden lg:inline-flex"
          >
            Login
          </Link>
        )}
        {/* Uiverse-inspired Theme Toggle */}
        <label className="swap swap-rotate">
          {/* this is hidden checkbox that controls the state */}
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />

          {/* sun icon */}
          <svg
            className="swap-on fill-current w-8 h-8 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64 17.657l-1.414 1.414L7.05 22.89l1.414-1.414zM12 18a6 6 0 100-12 6 6 0 000 12zm7.657-1.343l1.414 1.414 2.828-2.828-1.414-1.414zM12 2h0v3h0zM12 19h0v3h0zM2 12h3v0H2zm19 0h3v0h-3z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-off fill-current w-8 h-8 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64 13.65a9 9 0 01-11.3-11.3 1 1 0 00-1.42-1.42A10.978 10.978 0 0012 22a10.978 10.978 0 0011.07-8.94 1 1 0 00-1.43-1.41z" />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
