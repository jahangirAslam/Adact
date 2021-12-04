import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Tag } from "antd";

import { HeaderComponent, BodyComponent, TableComponent, ActionComponent, CreateComponent, FilterComponent } from "@comps/components";
import { execWithLoadingState, formatCompleteDataTime } from "@utils/helpers";
import { getUsers, getFilters } from "./requests";
import CreateUser from "./components/CreateUser";

const IndexUser = () => {

  const history = useHistory();
  const [loader, setLoader] = useState('');

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
      sorter: true,
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
      key: "actionns",
      title: 'Actions',
      render: (record) => ActionComponent({ each: record, onView: onView, onEdit: onEdit, onDelete: onDelete })
    },
  ];

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
    execWithLoadingState(setLoader, getUsers, payload, onSuccess, null);
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
    setChildComponent(<CreateUser onCreated={onCreated} />);
  }
  const onCreated = (success) => {
    if (success) {
      getAllUsers();
    }
    setChildComponent(null);
  }

  const onView = (record) => {
    history.push(`/user-management/users/view/${record.id}`);
  }

  const onEdit = (record) => {
    history.push(`/user-management/users/edit/${record.id}`);
  }

  const onDelete = (record) => {
    // delete here
  }

  return (
    <>
      {childComponent}
      <HeaderComponent>
        <CreateComponent onClick={onCreate} />
      </HeaderComponent>
      <BodyComponent>
        <FilterComponent filters={availableFilters} onFilter={setFilters} api={getFilters} />
        <TableComponent loader={loader} columns={columns} dataSource={dataSource} pagination={{ ...pagination, total: totalRecords }} onChange={handleTableChange} />
      </BodyComponent>
    </>
  );
}

export default IndexUser;

const availableFilters = [
  {
    key: 'name',
    placeholder: 'User Name',
    type: 'text',
  },
  {
    key: 'created_at',
    placeholder: 'Creation Date',
    type: 'date',
  },
  {
    key: 'is_active',
    placeholder: 'Select Status',
    type: 'select',
    data_key: 'actives'
  },
  {
    key: 'role_id',
    placeholder: 'Select Role',
    type: 'select',
    data_key: 'all_roles',
  }
];
