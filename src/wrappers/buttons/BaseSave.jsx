import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import BaseButton from "./BaseButton";

const BaseCreate = (props) => <BaseButton type="primary" {...props}><PlusOutlined /> Save</BaseButton>

export default BaseCreate;
