import {
  ActionComponent,
  BodyComponent,
  CreateButton,
  FilterComponent,
  HeaderComponent,
  TableComponent,
  SelectionTable
} from "@comps/components";
import {
  formatCompleteDataTime,
  makeRequest,
  notify,
  removeById,
} from "@utils/helpers";
import { Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CreateLaboratory from "./components/CreateLaboratory";
import { deleteLaboratory, getFilters, getLaboratories } from "./requests";

const pageConfig = {
  headers: {
    title: "List Of Laboratories",
    breadcrumb: [
      {
        name: "Laboratories",
        path: "/third-party/laboratories",
      },
    ],
  },
};

const IndexLaboratory = () => {
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

    {
      key: "account",
      title: "Account",
      dataIndex: "account",
      sorter: true,
    },

    {
      key: "status",
      title: "Status",
      dataIndex: "is_active",
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
    getAllLaboratory();
    // eslint-disable-next-line
  }, [pagination, filters]);

  const getAllLaboratory = () => {
    let payload = {
      start: pagination.current - 1,
      length: pagination.pageSize,
      sort_name: pagination.sortName,
      sort_type: pagination.sortType,
      // filters : {"type": "Laboratories"}
      filters: { ...filters, type: "Laboratories" },
    };
    makeRequest(setLoader, getLaboratories, payload, onSuccess, null);
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
    setChildComponent(<CreateLaboratory onCreated={onCreated} />);
  };

  const onCreated = (res) => {
    if (res) {
      history.push(`/third-party/laboratories/edit/${res.id}`);
    }
    setChildComponent(null);
  };

  const onEdit = (record) => {
    history.push(`/third-party/laboratories/edit/${record.id}`);
  };

  const onDelete = (record) => {
    let index = delItems.findIndex(o => o === record.id);
    if (index === -1) {
      delItems.push(record.id)
    }
    const payload = { "ids": delItems };
        makeRequest(setLoader, deleteLaboratory,payload, onDeleteSuccess,
            onError)
    }

  const onDeleteSuccess = (response, msg) => {
    getAllLaboratory();
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

export default IndexLaboratory;

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
