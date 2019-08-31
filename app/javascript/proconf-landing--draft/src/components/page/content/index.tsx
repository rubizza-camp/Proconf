import React from "react";
import './Content.css';

const Content = ({ children }: { children: JSX.Element[] | any }) => {
  return <div className='content'>{children}</div>;
};

export {
  Content as default,
}

