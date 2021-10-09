import React from "react";

import { Table, Divider, Button } from "antd";

export default function ActivityProfile() {
  const columnClass = "da-p1-body da-text-color-black-100 da-font-weight-200";
  const dividerClass = "da-border-color-black-40";

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: 200,
      render: (text) => <span className={columnClass}>{text}</span>,
    },
    {
      title: "IP",
      dataIndex: "ip",
      width: 200,
      render: (text) => <span className={columnClass}>{text}</span>,
    },
    {
      title: "Time",
      dataIndex: "time",
      render: (text) => <span className={columnClass}>{text}</span>,
    },
    {
      title: "#",
      dataIndex: "action",
      align: "right",
      render: (text) => (
        <Button
          type="text"
          className="da-p-0 da-p1-body da-text-color-black-100 da-font-weight-500"
        >
          {text}
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "Chrome on Window	",
      ip: "278.281.987.111",
      time: "Department",
      action: "Delete",
    },
    {
      key: "2",
      name: "Chrome on Mac",
      ip: "211.281.456.111",
      time: "Nov 12, 2019 08:56 PM",
      action: "Delete",
    },
    {
      key: "3",
      name: "Chrome on Window	",
      ip: "278.281.987.111",
      time: "Department",
      action: "Delete",
    },
    {
      key: "4",
      name: "Chrome on Mac",
      ip: "211.281.456.111",
      time: "Nov 12, 2019 08:56 PM",
      action: "Delete",
    },
    {
      key: "5",
      name: "Chrome on Window	",
      ip: "278.281.987.111",
      time: "Department",
      action: "Delete",
    },
    {
      key: "6",
      name: "Chrome on Mac",
      ip: "211.281.456.111",
      time: "Nov 12, 2019 08:56 PM",
      action: "Delete",
    },
  ];

  return (
    <div className="da-profile-activity">
      <h2 className="da-mb-4">Login Activity</h2>
      <p className="da-p1-body da-mb-0">
        Here is your last 10 login activities log.
      </p>

      <Divider className={dividerClass} />

      <Table
        className="da-overflow-scroll da-border-1 da-border-bottom-none da-border-radius"
        columns={columns}
        dataSource={data}
        pagination={{ position: ["none"] }}
        size="middle"
      />
    </div>
  );
}