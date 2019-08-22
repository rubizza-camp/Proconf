import React from "react";
import './Header.css';
import { Link } from "react-router-dom";
import { default as Navbar } from "./navbar";
import { default as Social } from "./social";

const Logo = () => {
  return <Link to='/' className='logo' />;
};

const Header = ({ children }: { children: JSX.Element[] }) => {
  return <div className='header'>{children}</div>;
};

Header.Logo = Logo;
Header.Navbar = Navbar;
Header.Social = Social;

export {
  Header as default,
}

