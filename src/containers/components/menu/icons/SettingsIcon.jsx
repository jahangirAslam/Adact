import React from "react";
import PropTypes from "prop-types";

const SettingsIcon = ({ className, fill, ...rest }) => {
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
      <path d="M8.9375 1.375V4.125L7.5625 4.8125L5.5 2.75L2.75 5.5L4.8125 7.5625L4.125 8.9375H1.375V13.0625H4.125L4.8125 14.4375L2.75 16.5L5.5 19.25L7.5625 17.1875L8.9375 17.875V20.625H13.0625V17.875L14.4375 17.1875L16.5 19.25L19.25 16.5L17.1875 14.4375L17.875 13.0625H20.625V8.9375H17.875L17.1875 7.5625L19.25 5.5L16.5 2.75L14.4375 4.8125L13.0625 4.125V1.375H8.9375Z" stroke="#0093CD" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M11 13.75C12.5188 13.75 13.75 12.5188 13.75 11C13.75 9.48122 12.5188 8.25 11 8.25C9.48122 8.25 8.25 9.48122 8.25 11C8.25 12.5188 9.48122 13.75 11 13.75Z" stroke="#0093CD" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />


    </svg>
  );
};

SettingsIcon.defaultProps = {
  fill: "#0093CD",
  className: "",
};

SettingsIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
};

export default SettingsIcon;
