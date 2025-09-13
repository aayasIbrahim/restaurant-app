import React from "react";
import NavbarTop from "../Navbar/NavberTop";
import NavbarBottom from "./NavbarBottom";
// import Form from "../form";


const Navbar = () => {
  return (
    <header className="w-full bg-white shadow-md">
       <NavbarTop />
       <NavbarBottom/>
    </header>
  );
};

export default Navbar;
