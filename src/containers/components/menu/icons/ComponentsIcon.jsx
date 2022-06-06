
import React from "react";
import PropTypes from "prop-types";

const ComponentsIcon = ({ className, fill, ...rest }) => {
  return (
    <svg
      className={className}
      {...rest}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path  d="M11 6.875C13.6579 6.875 15.8125 5.64378 15.8125 4.125C15.8125 2.60622 13.6579 1.375 11 1.375C8.34213 1.375 6.1875 2.60622 6.1875 4.125C6.1875 5.64378 8.34213 6.875 11 6.875Z" stroke="#0093CD" stroke-width="1.6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M6.1875 4.125V7.5625C6.1875 9.075 8.31875 10.3125 11 10.3125C13.6813 10.3125 15.8125 9.075 15.8125 7.5625V4.125" stroke="#0093CD" stroke-width="1.6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M1.375 8.25V14.4375L11 20.625L20.625 14.4375V8.25" stroke="#0093CD" stroke-width="1.6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M6.1875 5.15625L1.375 8.25L11 14.4375L20.625 8.25L15.8125 5.15625" stroke="#0093CD" stroke-width="1.6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M11 14.4375V20.625" stroke="#0093CD" stroke-width="1.6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
};

ComponentsIcon.defaultProps = {
  fill: "#0093CD",
  className: "",
};

ComponentsIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
};

export default ComponentsIcon;
