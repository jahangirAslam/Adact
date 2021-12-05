import React from "react";
import BaseButton from "./BaseButton";
import { CloseOutlined } from '@ant-design/icons';


const BaseCreate = (props) => <BaseButton type="primary" danger {...props}>Cancel <CloseOutlined /></BaseButton>

export default BaseCreate;
