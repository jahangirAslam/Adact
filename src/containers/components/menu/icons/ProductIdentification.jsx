
import React from "react";
import PropTypes from "prop-types";

const ProductIdentification = ({ className, fill, ...rest }) => {
    return (

        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 18C11.775 17.9996 13.4988 17.4054 14.897 16.312L19.293 20.708L20.707 19.294L16.311 14.898C17.405 13.4997 17.9996 11.7754 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4Z" fill="#0093CD" />
            <path d="M11.412 8.58599C11.791 8.96599 12 9.46799 12 9.99999H14C14.0009 9.47442 13.8976 8.95389 13.6961 8.46848C13.4946 7.98307 13.1988 7.54242 12.826 7.17199C11.312 5.65999 8.687 5.65999 7.174 7.17199L8.586 8.58799C9.346 7.82999 10.656 7.832 11.412 8.58599Z" fill="#0093CD" />
        </svg>

    );
};

ProductIdentification.defaultProps = {
    fill: "#0093CD",
    className: "",
};

ProductIdentification.propTypes = {
    fill: PropTypes.string,
    className: PropTypes.string,
};

export default ProductIdentification;