import React from "react";
import { FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { TbBrandLinkedin } from "react-icons/tb";
import { Link } from "react-router-dom"; 

const Footer = () => {
  return (
    <footer
      // bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100
      //   dark:from-base-bg
      //   dark:via-base-100
      //   dark:to-base-300
      //   py-10
      //   text-base-content
      //   dark:text-base
      className="footer footer-horizontal footer-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                dark:from-gray-800 dark:via-gray-900 dark:to-gray-700
                transition-colors duration-500 py-10 mt-10 text-base-100"
    >
      {/* brand logo */}
      <div className="flex items-center ">
        <Link
          to="/"
          className="flex items-center text-2xl font-bold text-base ml-2 hover:opacity-90"
        >
          <img
            className="w-[30px] h-[30px] mr-2"
            src="https://i.ibb.co/NRcbWqm/favicon.png"
            alt="Learnify logo"
          />
          Learnify
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="grid grid-flow-col gap-4 ">
        <a className="link link-hover">Privacy Policy</a>
        <a className="link link-hover">Terms And Conditions</a>
      </nav>

      {/* Social Links */}
      <nav>
        <div className="grid grid-flow-row gap-3 justify-center items-center">
          <div className="grid grid-flow-col gap-4 justify-center items-center text-xl">
            <Link
              to="https://www.facebook.com/abd.rahim.badsha/"
              target="_blank"
            >
              <FaFacebook className="hover:text-primary transition-colors duration-300" />
            </Link>
            <Link to="https://www.linkedin.com/in/abdrahimbd/" target="_blank">
              <TbBrandLinkedin className="hover:text-primary transition-colors duration-300" />
            </Link>
            <Link to="https://www.youtube.com/" target="_blank">
              <IoLogoYoutube className="hover:text-red-500 transition-colors duration-300" />
            </Link>
          </div>

          <p className="text-center pt-3">
            <strong>Email:</strong> rahimbadsha.cse@gmail.com
          </p>
        </div>
      </nav>

      <div className="divider h-[2px] w-full p-0 m-0 "></div>

      {/* Footer Text */}
      <aside className="mt-3">
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved by{" "}
          <span className="font-semibold text-primary">
            <Link
              to="https://www.facebook.com/abd.rahim.badsha/"
              target="_blank"
            >
              Abdur Rahim
            </Link>
          </span>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
