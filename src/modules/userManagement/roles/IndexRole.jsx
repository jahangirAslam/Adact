import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { HeaderComponent, BodyComponent, TableComponent, ActionComponent, CreateButton } from "@comps/components";
import { makeRequest, removeById,formatCompleteDataTime, notify } from "@utils/helpers";
import { getRoles, deleteRole } from "./requests";
import CreateRole from "./components/CreateRole.jsx";

const pageConfig = {
  headers: {
    title: "Roles",
    breadcrumb: [
      {
        name: "Roles",
        path: "/user-management/roles"
      }
    ]
  }
}

const IndexRole = () => {

  const history = useHistory();
  const [loader, setLoader] = useState(false);

  const [dataSource, setDataSource] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 25,
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
      render: (record) => ActionComponent({ each: record, onView: onView, onEdit: onEdit, onDelete: onDelete })
    },
  ];

  useEffect(() => {
    getAllRoles();
    // eslint-disable-next-line
  }, [pagination]);

  const getAllRoles = () => {
    let payload = {
      start: pagination.current - 1,
      length: pagination.pageSize,
      sort_name: pagination.sortName,
      sort_type: pagination.sortType,
    };
    makeRequest(setLoader, getRoles, payload, onSuccess, null);
  }

  const onSuccess = (response) => {
    setTotalRecords(response.recordsTotal);
    setDataSource(response.data);
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
    setChildComponent(<CreateRole onCreated={onCreated} />);
  }
  const onCreated = (res) => {
    setDataSource([...dataSource, res]);
    setChildComponent(null);
  }

  const onView = (record) => {
    history.push(`/user-management/roles/view/${record.id}`);
  }
  
  const onEdit = (record) => {
    history.push(`/user-management/roles/edit/${record.id}`);
  }

  const onDelete = (record) => {
    makeRequest(setLoader, deleteRole, record.id, onDeleteSuccess,
      onError)
  }

  const onDeleteSuccess = (response, msg) => {
    setDataSource(removeById(dataSource, response.id));
    notify(msg.msg)
  }

  const onError = (error, msg) => {
    notify(msg.message)
  }

  return (
    <>
      {childComponent}
      <HeaderComponent headers={pageConfig.headers}>
        <CreateButton onClick={onCreate} />
      </HeaderComponent>
      <BodyComponent>
        <TableComponent loader={loader} columns={columns} dataSource={dataSource} pagination={{ ...pagination, total: totalRecords }} onChange={handleTableChange} />
      </BodyComponent>
    </>
  );
}

export default IndexRole;
