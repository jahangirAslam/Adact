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
      key: 'manufacturer_id',
      title: 'Manufacturer name',
      dataIndex: 'manufacturer_id',
      sorter: false,
    },
    {
      key: 'manufacturer_ref',
      title: 'Ref.(Manufacturer)',
      dataIndex: 'manufacturer_ref',
      sorter: false,
    },
    {
      key: 'fed_uuin',
      title: 'FED UUIN',
      dataIndex: 'fed_uuin',
      sorter: false,
    }, {
      key: 'is_valid',
      title: 'is_valid',
      dataIndex: 'is_valid',
      sorter: false,
    }, {
      key: 'has_recipe',
      title: 'has_recipe',
      dataIndex: 'has_recipe',
      sorter: false,
    }, {
      key: 'is_valid_manufacturer',
      title: 'is_valid_manufacturer',
      dataIndex: 'is_valid_manufacturer',
      sorter: false,
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
  }, {
    key: 'role_id',
    placeholder: 'Composition',
    type: 'select',
  }
  , {
    key: 'role_id',
    placeholder: 'Status',
    type: 'select',
  }

];
