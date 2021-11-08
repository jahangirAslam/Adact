import React from "react";
import BaseButton from "./BaseButton";
import "./buttons-styles.css"

const BaseCreate = (props) => <BaseButton type="primary" className={"button-right-align"} {...props} icon={<i className="ri-add-box-fill" />} >Create</BaseButton>

export default BaseCreate;
