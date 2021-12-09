import React from "react";
import {Link} from "react-router-dom";

import Logo from "@assets/images/logo/logo.png";

export default function MenuLogo(props) {
    return (
        <Link
            to="/"
            className="da-d-flex da-align-items-end"
            onClick={props.onClose}
        >
            <img className="da-logo" src={Logo} alt="logo"/>

            <span className="h3 d-font-weight-800 da-text-color-primary-1 da-mb-6">.</span>

            <span
                className="da-p1-body da-font-weight-700 da-text-color-black-40 da-mb-16 da-ml-4"
                style={{
                    letterSpacing: -1.5
                }}
            >
        v.1.0.1
      </span>
        </Link>
    );
}
