import React from "react";
import notFoundImg from "../assets/error-404.png";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="mx-auto max-w-[1600px] flex flex-col justify-center items-center gap-5 py-10">
      <img src={notFoundImg} alt="" />
      <h2 className="font-bold text-xl md:text-3xl">OPPS! page not found!</h2>
      <p>The page you are looking for is not available.</p>
      <Link to={"/"}>
        <button className="w-[145px] h-[48px] flex flex-row justify-center items-center gap-[10px] px-4 py-3 rounded bg-gradient-to-br from-[#632EE3] to-[#9F62F2] text-white">
          Go Back!
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
