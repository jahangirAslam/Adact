import React from "react";
import BaseButton from "./BaseButton";
import { SaveOutlined } from '@ant-design/icons';


const BaseCreate = (props) => <BaseButton type="primary" {...props}>Save <SaveOutlined /></BaseButton>

export default BaseCreate;
