import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";

const Header = () => {
  return (
    <header className=" d-flex p-2 gap-3 align-items-center justify-content-between  ">
      <Link to="/">
        <div className="d-flex justify-content-between align-items-center ">
          <img style={{ width: "150px", padding: "10px" }} src={Logo} />
        </div>
      </Link>
      <div className=" d-flex gap-3 mx-5 align-items-center">
        <span className="text-light">UNLIMITED TV PROGRAMMES & FILMS</span>
        <button className="button1 btn btn-danger">JOIN NOW</button>
        <button className=" button2 btn">Sign Out</button>
      </div>
    </header>
  );
};

export default Header;
