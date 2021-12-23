import React from "react";
import BaseButton from "./BaseButton";
import { PlusOutlined } from '@ant-design/icons';

const BaseImport = (props) => <BaseButton type="info" className={"button-right-align"} {...props} >Import <PlusOutlined /></BaseButton>

export default BaseImport;
