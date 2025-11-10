import { use } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const {user, logOut} = use(AuthContext)

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
          Courses
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

      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold"
                : "hover:text-primary transition-colors"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
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
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
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
      </div>
    </div>
  );
};

export default Navbar;
