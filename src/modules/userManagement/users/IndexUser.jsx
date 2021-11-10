import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Tag } from "antd";

import { HeaderComponent, BodyComponent, TableComponent, ActionComponent, CreateComponent } from "@comps/components";
import { execWithLoadingState, formatCompleteDataTime, notify } from "@utils/helpers";
import { getUsers, deleteUser } from "./requests";
import CreateUser from "./components/CreateUser";

const IndexUser = () => {

  const history = useHistory()
  const [loader, setLoader] = useState('')

  const [dataSource, setDataSource] = useState([])
  const [totalRecords, setTotalRecords] = useState(0)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    sortName: 'id',
    sortType: 'desc',
  })

  const [childComponent, setChildComponent] = useState(null)

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
        let color = is_active ? 'green' : 'red'
        let text = is_active ? 'ACTIVE' : 'INACTIVE'
        return (
          <Tag color={color}>{text}</Tag>
        )
      },
    },
    {
      key: 'created_at',
      title: 'Create At',
      dataIndex: 'created_at',
      sorter: true,
      render: (created_at) => {
        return formatCompleteDataTime(created_at)
      },
    },
    {
      key: 'actionns',
      title: 'Actions',
      render: (record) => ActionComponent(
        { each: record, onView: onView, onEdit: onEdit, onDelete: onDelete }),
    },
  ]

  useEffect(() => {
    getAllUsers()
    // eslint-disable-next-line
  }, [pagination])

  const getAllUsers = () => {
    let payload = {
      start: pagination.current - 1,
      length: pagination.pageSize,
      sort_name: pagination.sortName,
      sort_type: pagination.sortType,
    }
    execWithLoadingState(setLoader, getUsers, payload, onSuccess, null)
  }

  const onSuccess = (response) => {
    setTotalRecords(response.recordsTotal)
    setDataSource(response.data)
  }

  const onDeleteSuccess = (response, msg) => {
    setDataSource(dataSource.filter((index) => (index.id !== response.id)))
    notify(msg.msg)
  }

  const handleTableChange = (page, filters, sorter) => {
    let payload = {
      ...pagination,
      current: page.current,
      pageSize: page.pageSize,
      sortName: sorter.field || 'id',
      sortType: sorter.order === 'ascend' ? 'asc' : 'desc',
    }
    setPagination(payload)
  }

  // Create component modal
  const onCreate = () => {
    setChildComponent(<CreateUser onCreated={onCreated}/>)
  }
  const onCreated = (success) => {
    if (success) {
      getAllUsers()
    }
    setChildComponent(null)
  }

  const onView = (record) => {
    history.push(`/user-management/users/view/${record.id}`)
  }

  const onEdit = (record) => {
    history.push(`/user-management/users/edit/${record.id}`)
  }

  const onDelete = (record) => {
    execWithLoadingState(setLoader, deleteUser, record.id, onDeleteSuccess,
      null)
  }

  return (
    <>
      {childComponent}
      <HeaderComponent>
        <CreateComponent onClick={onCreate}/>
      </HeaderComponent>
      <BodyComponent>
        <TableComponent loader={loader} columns={columns}
                        dataSource={dataSource}
                        pagination={{ ...pagination, total: totalRecords }}
                        onChange={handleTableChange}/>
      </BodyComponent>
    </>
  )
}

export default IndexUser
