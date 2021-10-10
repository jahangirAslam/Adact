import { Link } from "react-router-dom";

import store from "../../../redux/store";
import { getUser, deleteUser } from "../../../redux/contact/contactActions";

import { Avatar, Popconfirm, Tag } from "antd";
import { User, Delete } from "react-iconly";
import { RiErrorWarningLine } from "react-icons/ri";

// Popconfirm
function confirm(dataId) {
  store.dispatch(deleteUser(dataId))
}

export const columns = [
  {
    title: "",
    dataIndex: "key",
    render: (dataIndex) => {
      return (
        <>
          <Link
            onClick={() => store.dispatch(getUser(dataIndex))}
            to={`/apps/contact/contact-detail/${dataIndex}`}
          >
            <Avatar
              size={48}
              icon={<User set="curved" className="da-text-align-center" />}
            ></Avatar>
          </Link>
        </>
      );
    },
  },
  {
    title: "Name",
    dataIndex: "fullName",
  },
  {
    title: "Role",
    dataIndex: "role",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (dataIndex) => {
      if (dataIndex === "inactive") {
        return <Tag color="red">{dataIndex}</Tag>;
      } else if (dataIndex === "pending") {
        return <Tag color="yellow">{dataIndex}</Tag>;
      } else if (dataIndex === "active") {
        return <Tag color="green">{dataIndex}</Tag>;
      }
    },
  },
  {
    title: "Phone",
    dataIndex: "contact",
  },
  {
    dataIndex: "key",
    render: (dataIndex) => (
      <Popconfirm
        placement="topLeft"
        title="Are you sure to delete this contact?"
        onConfirm={() => confirm(dataIndex)}
        okText="Yes"
        cancelText="No"
        icon={
          <RiErrorWarningLine className="remix-icon da-text-color-primary-1" />
        }
      >
        <Delete
          size={24}
          className="da-cursor-pointer da-transition da-hover-text-color-danger-1 da-text-color-black-80"
        />
      </Popconfirm>
    ),
  },
];
