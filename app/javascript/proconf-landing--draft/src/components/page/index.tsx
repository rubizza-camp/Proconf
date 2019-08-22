import React from "react";
import './Page.css';

import { default as Content } from './content';
import { default as Header } from './header';
import { default as Footer } from './footer';
import { default as Paginator } from './paginator';

const Page = ({children}: {children: any}) => {
  return <div className="page">
    {children}
  </div>
}

Page.Content = Content;
Page.Header = Header;
Page.Footer = Footer;
Page.Paginator = Paginator;

export {
  Page as default,
}