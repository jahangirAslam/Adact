import React from "react";
import PropTypes from "prop-types";

const ProductsIcon = ({ className, fill, ...rest }) => {
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
      <path d="M8 14H3V16H8V14Z" fill="#0093CD" />
      <path d="M12 17H3V19H12V17Z" fill="#0093CD" />
      <path d="M18.3333 2H1.66667C1.22481 2.00055 0.801206 2.17632 0.488764 2.48876C0.176323 2.80121 0.00055129 3.22481 0 3.66667V20.3333C0.00055129 20.7752 0.176323 21.1988 0.488764 21.5112C0.801206 21.8237 1.22481 21.9994 1.66667 22H18.3333C18.7752 21.9994 19.1988 21.8237 19.5112 21.5112C19.8237 21.1988 19.9994 20.7752 20 20.3333V3.66667C19.9994 3.22481 19.8237 2.80121 19.5112 2.48876C19.1988 2.17632 18.7752 2.00055 18.3333 2ZM11.6667 3.66667V7H8.33333V3.66667H11.6667ZM1.66667 20.3333V3.66667H6.66667V8.66667H13.3333V3.66667H18.3333L18.3343 20.3333H1.66667Z" fill="#0093CD" />

    </svg>
  );
};

ProductsIcon.defaultProps = {
  fill: "#0093CD",
  className: "",
};

ProductsIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
};

export default ProductsIcon;
