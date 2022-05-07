import React from "react";
import BaseButton from "./BaseButton";
import { PlusOutlined } from '@ant-design/icons';

const BaseCreate = (props) => <BaseButton type="primary" className={"button-right-align"} {...props} >ADD <PlusOutlined /></BaseButton>

export default BaseCreate;
