import React from "react";

const BaseBody = (props) => {

  return (
    <div className="site-page-wrapper">
      <hr className="gx-mt-0" />
      <div className="site-layout-content">
        {props.children}
      </div>
    </div>
  );

};

export default BaseBody;
