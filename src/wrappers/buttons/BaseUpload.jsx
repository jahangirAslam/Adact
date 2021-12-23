import React from "react";
import BaseButton from "./BaseButton";
import { UploadOutlined  } from '@ant-design/icons';

const BaseUpload = (props) => <BaseButton type="info" className={"button-right-align"} {...props} >{props.text} <UploadOutlined  /></BaseButton>

export default BaseUpload;
