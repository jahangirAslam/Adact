import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Tag } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { HeaderComponent, BodyComponent, TableComponent, ActionComponent, CreateButton, FilterComponent, ImportButton } from "@comps/components";
import { makeRequest, formatCompleteDataTime, notify, removeById, replaceById } from "@utils/helpers";
import { getUsers, activateUserRequest, getFilters, deleteUser } from "../../userManagement/users/requests";
import CreateUser from "../../userManagement/users/components/CreateUser";
import ImportUser from "../../userManagement/users/components/ImportUser";
import CreateFlavour from "./components/CreateFlavour";

const pageConfig = {
  headers: {
    title: "Flavour",
    breadcrumb: [
      {
        name: "Flavour",
        // path: "/flavours"
      }
    ]
  }
}

const Flavours = () => {

  const history = useHistory();
  const [loader, setLoader] = useState(false);

  const [dataSource, setDataSource] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    sortName: 'id',
    sortType: 'desc'
  });

  const [childComponent, setChildComponent] = useState(null);

  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      key: 'role_name',
      title: 'Role',
      dataIndex: 'role_name',
      sorter: false,
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'is_active',
      sorter: true,
      render: (is_active) => {
        let color = is_active ? 'green' : 'red';
        let text = is_active ? 'ACTIVE' : 'INACTIVE';
        return (
          <Tag color={color} >{text}</Tag>
        );
      }
    },
    {
      key: 'created_at',
      title: 'Create At',
      dataIndex: 'created_at',
      sorter: true,
      render: (created_at) => {
        return formatCompleteDataTime(created_at);
      }
    },
    {
      key: "actions",
      title: 'Actions',
      render: (record) => ActionComponentEx(record)
    },
  ];

  const ActionComponentEx = (record) => {
    let icon = null;
    if (record) {
      if (record.is_active) {
        icon = <CloseOutlined className="icon-style da-text-color-danger-1" />;
      } else {
        icon = <CheckOutlined className="icon-style da-text-color-success-1" />;
      }
    }
    return (
      <ActionComponent each={record} onView={onView} onEdit={onEdit} onDelete={onDelete}>
        <Button className="da-px-10 da-my-0" type="link" size="middle" onClick={() => activateDeactiveUser(record)}>{icon}</Button>
      </ActionComponent>
    );
  }

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, [pagination, filters]);

  const getAllUsers = () => {
    let payload = {
      start: pagination.current - 1,
      length: pagination.pageSize,
      sort_name: pagination.sortName,
      sort_type: pagination.sortType,
      filters
    };
    makeRequest(setLoader, getUsers, payload, onSuccess, null);
  }

  const activateDeactiveUser = (user) => {
    makeRequest(setLoader, activateUserRequest, user, onActivateSuccess, onError);
  }
  const onActivateSuccess = (res, msg) => {
    setDataSource(replaceById(dataSource, res));
    notify(msg.msg)
  }
  const onSuccess = (response) => {
    setTotalRecords(response.recordsTotal);
    setDataSource(response.data);
  }

  const onImported = (res) => {
    getAllUsers();
    setChildComponent(null);
  }

  const handleTableChange = (page, fil, sorter) => {
    let payload = {
      ...pagination,
      current: page.current,
      pageSize: page.pageSize,
      sortName: sorter.field || 'id',
      sortType: sorter.order === 'ascend' ? 'asc' : 'desc',
    };
    setPagination(payload);
  }

  // Create component modal
  const onCreate = () => {
    setChildComponent(<CreateFlavour onCreated={onCreated} />);
  }

  const onCreated = (each) => {
    if (!each) {
      setChildComponent(null);
    }
    setDataSource([...dataSource, each.object]);
  }

  const onImport = () => {
    setChildComponent(<ImportUser onImported={onImported} />);
  }

  const onView = (record) => {
    history.push(`/user-management/users/view/${record.id}`);
  }

  const onEdit = (record) => {
    history.push(`/user-management/users/edit/${record.id}`);
  }

  const onDelete = (record) => {
    makeRequest(setLoader, deleteUser, record.id, onDeleteSuccess,
      onError)
  }

  const onDeleteSuccess = (response, msg) => {
    setDataSource(removeById(dataSource, response.id));
    notify(msg.msg)
  }

  const onError = (error, msg) => {
    //
  }

  return (
    <>
      {childComponent}
      <HeaderComponent headers={pageConfig.headers}>
        <CreateButton onClick={onCreate} />
      </HeaderComponent>
      <BodyComponent>
        <FilterComponent filters={availableFilters} onFilter={setFilters} api={getFilters} />

        <TableComponent loader={loader} columns={columns} dataSource={dataSource} pagination={{ ...pagination, total: totalRecords }} onChange={handleTableChange} />
      </BodyComponent>
    </>
  );
}

export default Flavours;

const availableFilters = [
  {
    key: 'name',
    placeholder: 'Flavour Name',
    type: 'text',
  },
  {
    key: 'created_at',
    placeholder: 'Manufacturer name',
    type: 'select',
  },
  {
    key: 'is_active',
    placeholder: 'Ref.(Manufacturer)',
    type: 'text',
  },
  {
    key: 'role_id',
    placeholder: 'FED UUIN',
    type: 'text',
  },{
    key: 'role_id',
    placeholder: 'Composition',
    type: 'select',
  }
  ,{
    key: 'role_id',
    placeholder: 'Status',
    type: 'select',
  }
  
];
