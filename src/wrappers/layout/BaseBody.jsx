import React from "react";

const BaseBody = (props) => {
  return (
    <div className="site-page-wrapper da-px-32">
      {/* {props.hideLine ? (
        <div className="da-mt-16"></div>
      ) : (
        <hr className="da-my-10" />
      )} */}
      <div className="site-layout-content">{props.children}</div>
    </div>
  );
};

export default BaseBody;
