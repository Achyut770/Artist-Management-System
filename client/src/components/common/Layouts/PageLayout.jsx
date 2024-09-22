import React from "react";
import CustomTitle from "../CustomTitle";
const PageLayout = ({ children, title }) => {
  return (
    <div className="route_container">
      <CustomTitle title={title} />

      <h2 className="header_route">{title}</h2>
      {children}
    </div>
  );
};

export default PageLayout;
