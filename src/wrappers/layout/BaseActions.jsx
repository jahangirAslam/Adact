import React from "react";
import { Button, Popconfirm } from "antd";
import {DeleteOutlined, EditOutlined, FolderViewOutlined, WarningOutlined, PlusOutlined} from "@ant-design/icons";
import "./layouts-styles.css"

const classes = "gx-p-0 gx-my-0 button-padding-5";

const BaseAction = (props) => {
  return (
    <>
      {props.onView ? <Button className={classes} type="link" size="middle" onClick={() => view(props)}><FolderViewOutlined className={"icon-style"} /></Button> : null}
      {props.onAdd ? <Button className={classes} type="link" size="middle" onClick={() => add(props)}><PlusOutlined  className={"icon-style"} /></Button> : null}
      {props.onEdit ? <Button className={classes} type="link" size="middle" onClick={() => edit(props)}><EditOutlined className={"icon-style"} /></Button> : null}
      {props.onDelete ? (
        <Popconfirm title="Are you sure?" icon={<WarningOutlined />} onConfirm={() => del(props)}>
          <Button className={classes} type="link" size="middle"><DeleteOutlined className={"icon-style"} /></Button>
        </Popconfirm>
      ) : null}
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
