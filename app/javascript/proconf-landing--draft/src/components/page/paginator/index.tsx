import React from "react";
import './Paginator.css';
import { Link } from "react-router-dom";

import {
  ArrowRightOutline,
  ArrowLeftOutline
} from "@ant-design/icons";
import AntdIcon from "@ant-design/icons-react";

AntdIcon.add(ArrowRightOutline, ArrowLeftOutline);

const Paginator = () => {
  return <div className="paginator">
    <Link to={'/page/1'} onClick={() =>  window.scrollTo(0, 0)}><AntdIcon type={ArrowLeftOutline} /> Сюда</Link>
    <Link to={'/page/2'} onClick={() =>  window.scrollTo(0, 0)}>Туда <AntdIcon type={ArrowRightOutline} /></Link>
  </div>
}

export {
  Paginator as default,
}
