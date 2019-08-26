import React from "react";
import './Navbar.css';
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

const getPage = (path: string) => {
  return {
    isHome: path.startsWith('/episodes') || path.startsWith('/page') || path === '/',
    isAbout: path.startsWith('/about'),
    isDonate: path.startsWith('/donate')
  }
}

const Navbar = ({match}: RouteComponentProps) => {
  const pageParams = getPage(window.location.pathname);
  return (
    <div className='navbar'>
      <Link to='/' className={`navbar__item ${pageParams.isHome && 'navbar__item--active'}`}>
        Выпуски
      </Link>
      <Link to='/about' className={`navbar__item ${pageParams.isAbout && 'navbar__item--active'}`}>
        О нас
      </Link>
      <Link to='/donate' className={`navbar__item ${pageParams.isDonate && 'navbar__item--active'}`}>
        Dontate
      </Link>
    </div>
  );
};

const NavbarWithRouter = withRouter(Navbar);

export {
  NavbarWithRouter as default,
}