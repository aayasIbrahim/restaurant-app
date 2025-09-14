import React from "react";
import NavbarTop from "../Navbar/NavberTop";
import NavbarBottom from "./NavbarBottom";
// import Form from "../form";


const Navbar = () => {
  return (
    <header className="sticky top-0 bg-white px-3 z-50 w-full  shadow-md">
       <NavbarTop />
       <NavbarBottom/>
    </header>
  );
};

export default Navbar;
