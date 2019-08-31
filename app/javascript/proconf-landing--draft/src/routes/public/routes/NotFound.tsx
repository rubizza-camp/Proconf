import React from "react";
import "./NotFound.css";
import { Page } from "../../../components";

const NotFoundContent = () => {
  return <div className="not-found">
    <div className="not-found__code">404</div>
    <div className="not-found__text">Страница не найдена</div>
  </div>;
};

export const NotFound = () => {
  return (
    <>
      <Page.Content>
        <NotFoundContent />
      </Page.Content>
    </>
  );
};
