import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  HeaderComponent,
  BodyComponent,
  TableComponent,
  ActionComponent,
  CreateButton,
  FilterComponent,
  SelectionTable
} from "@comps/components";
import {
  makeRequest,
  removeById,
  formatCompleteDataTime,
  notify,
} from "@utils/helpers";
import { getAgents, deleteAgent, getFilters, deleteAgents } from "./requests";
import CreateAgent from "./components/CreateAgent";
import { Tag } from "antd";

const pageConfig = {
  headers: {
    title: "Manage Agents",
    breadcrumb: [
      {
        name: "Agents",
        path: "/third-party/all-third-parties",
      },
    ],
  },
};

const IndexAgent = () => {
  var delItems = [];
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const [filters, setFilters] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [childComponent, setChildComponent] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 25,
    sortName: "id",
    sortType: "desc",
  });

  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      key: "country_name",
      title: "Country",
      dataIndex: "country_name",
      sorter: true,
    },
    {
      key: "Email",
      title: "Email",
      dataIndex: "Email",
      sorter: true,
    },
    {
      key: "first_address_line",
      title: "Address",
      dataIndex: "first_address_line",
      sorter: true,
    },
    {
      key: "phone",
      title: "Contact",
      dataIndex: "phone",
      sorter: true,
    },
    // {
    //     key: 'account',
    //     title: 'Account',
    //     dataIndex: 'account',
    //     sorter: true,
    // },

    {
      key: "account_status",
      title: "Status",
      dataIndex: "account_status",
      render: (is_active) => {
        let color = is_active ? "green" : "red";
        let text = is_active ? "ACTIVE" : "INACTIVE";
        return <Tag color={color}>{text}</Tag>;
      },
    },
    // {
    //     key: 'created_at',
    //     title: 'Create At',
    //     dataIndex: 'created_at',
    //     sorter: true,
    //     render: (created_at) => {
    //         return formatCompleteDataTime(created_at);
    //     }
    // },
    {
      key: "actions",
      title: "Actions",
      render: (record) =>
        ActionComponent({ each: record, onEdit: onEdit, onDelete: onDelete }),
    },
  ];

  useEffect(() => {
    getAllAgents();
    // eslint-disable-next-line
  }, [pagination, filters]);

  const getAllAgents = () => {
    let payload = {
      start: pagination.current - 1,
      length: pagination.pageSize,
      sort_name: pagination.sortName,
      sort_type: pagination.sortType,
      // filters: { "type": "Agents" }
      filters: { ...filters, agent: true },
    };
    makeRequest(setLoader, getAgents, payload, onSuccess, null);
  };

  const onSuccess = (response) => {
    setTotalRecords(response.recordsTotal);
    setDataSource(response.data);
  };

  const handleTableChange = (page, fil, sorter) => {
    let payload = {
      ...pagination,
      current: page.current,
      pageSize: page.pageSize,
      sortName: sorter.field || "id",
      sortType: sorter.order === "ascend" ? "asc" : "desc",
    };
    setPagination(payload);
  };

  // Create component modal
  const onCreate = () => {
    setChildComponent(<CreateAgent onCreated={onCreated} />);
  };

  const onCreated = (res) => {
    if (res) {
      history.push(`/third-party/agents/edit/${res.data.object.id}`);
    }
    setChildComponent(null);
  };

  const onEdit = (record) => {
    history.push(`/third-party/agents/edit/${record.id}`);
  };

  const onDelete = (record) => {
    let index = delItems.findIndex(o => o === record.id);
    if (index === -1) {
      delItems.push(record.id)
    }
    const payload = { "ids": delItems };
        makeRequest(setLoader, deleteAgents,payload, onDeleteSuccess,
            onError)
    }

  const onDeleteSuccess = (response, msg) => {
    getAllAgents();
    notify(msg.msg);
  };

  const onError = (error, msg) => {
    notify(msg.message);
  };
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      delItems = [];
      delItems = selectedRowKeys;
    },
  };

  return (
    <>
      {childComponent}
      <HeaderComponent headers={pageConfig.headers}>
        <CreateButton onClick={onCreate} />
      </HeaderComponent>
      <BodyComponent>
        <FilterComponent
          filters={availableFilters}
          onFilter={setFilters}
          api={getFilters}
        />
        <SelectionTable
          loader={loader}
          columns={columns}
          dataSource={dataSource}
          pagination={{ ...pagination, total: totalRecords }}
          rowSelection={rowSelection}
          onChange={handleTableChange}
        />
      </BodyComponent>
    </>
  );
};

export default IndexAgent;

const availableFilters = [
  {
    key: "name",
    placeholder: "Name",
    type: "text",
  },
  {
    key: "country_id",
    placeholder: "Country ",
    type: "select",
    data_key: "country",
  },
  {
    key: "email",
    placeholder: "Email ",
    type: "text",
  },
  {
    key: "status",
    placeholder: "Status ",
    type: "select",
    data_key: "status",
  },
];
