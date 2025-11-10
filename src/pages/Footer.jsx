import React from "react";
import { FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { TbBrandLinkedin } from "react-icons/tb";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-horizontal footer-center bg-[#ffe4da] py-10   text-base-content rounded p-10">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Terms And Conditions</a>
        </nav>
        <nav>
          <div>
            <div className="grid grid-flow-col gap-2 justify-center items-center">
              <Link to={"https://www.facebook.com/abd.rahim.badsha/"}>
                <FaFacebook></FaFacebook>
              </Link>
              <Link to={"https://www.linkedin.com/in/abdrahimbd/"}>
                <TbBrandLinkedin></TbBrandLinkedin>
              </Link>

              <IoLogoYoutube></IoLogoYoutube>
            </div>
            <div>
              <p className="text-center pt-3">
                <strong>Email: </strong>rahimbadsha.cse@gmail.com
              </p>
            </div>
          </div>
        </nav>
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by Programming Hero Coder
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
