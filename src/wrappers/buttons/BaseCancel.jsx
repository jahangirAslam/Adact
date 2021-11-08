import React from "react";
import BaseButton from "./BaseButton";

const BaseCreate = (props) => <BaseButton type="primary" danger icon={<i className="ri-close-circle-fill" />} {...props}>Cancel</BaseButton>

export default BaseCreate;
