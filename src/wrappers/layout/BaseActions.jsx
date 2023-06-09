import React from "react";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, WarningOutlined, PlusOutlined } from "@ant-design/icons";
import "./layouts-styles.css"

const classes = "da-px-10 da-my-0";

const BaseAction = (props) => {
  return (
    <>
      {props.onView ? <Button className={classes} type="link" size="middle" onClick={() => view(props)}><EyeOutlined className="icon-style da-text-color-info-1" /></Button> : null}
      {props.onAdd ? <Button className={classes} type="link" size="middle" onClick={() => add(props)}><PlusOutlined className="icon-style" /></Button> : null}
      {props.onEdit ? <Button className={classes} type="link" size="middle" onClick={() => edit(props)}><EditOutlined className="icon-style da-text-color-warning-1" /></Button> : null}
      {props.onDelete ? (
        <Popconfirm title="Are you sure?" icon={<WarningOutlined />} onConfirm={() => del(props)}>
          <Button className={classes} type="link" size="middle"><DeleteOutlined className="icon-style  da-text-color-danger-1" /></Button>
        </Popconfirm>
      ) : null}
      {props.children}
    </>
  );
};

const view = (props) => {
  if (props.onView) {
    props.onView(props.each);
  }
}

const edit = (props) => {
  if (props.onEdit) {
    props.onEdit(props.each);
  }
}

const add = (props) => {
  if (props.onAdd) {
    props.onAdd(props.each);
  }
}

const del = (props) => {
  if (props.onDelete) {
    props.onDelete(props.each);
  }
}

export default BaseAction;
