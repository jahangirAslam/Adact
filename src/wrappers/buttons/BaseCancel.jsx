import React from "react";
import BaseButton from "./BaseButton";

const BaseCreate = (props) => <BaseButton type="primary" danger {...props}> <i className="ri-close-circle-fill" /> Cancel</BaseButton>

export default BaseCreate;
