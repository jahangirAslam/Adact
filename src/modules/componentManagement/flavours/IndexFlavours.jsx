import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { ActionComponent, BodyComponent, CreateButton, FilterComponent, HeaderComponent, SelectionTable } from "@comps/components";
import { makeRequest, notify, removeById } from "@utils/helpers";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CreateFlavour from "./components/CreateFlavour";
import { deleteFlavour, getFilters, getFlavours } from "./components/request";

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
  var delItems = []
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
      sorter: (a, b) => a && a.name.length - b && b.name.length,


    },
    {
      key: 'manufacturer_id',
      title: 'Manufacturer name',
      dataIndex: 'manufacturer_id',
      sorter: (a, b) => a && a.manufacturer_id.length - b && b.manufacturer_id.length,

    },
    {
      key: 'manufacturer_ref',
      title: 'Ref.(Manufacturer)',
      dataIndex: 'manufacturer_ref',
      sorter: (a, b) => a && a.manufacturer_ref.length - b && b.manufacturer_ref.length,
    },
    {
      key: 'fed_uuin',
      title: 'FED UUIN',
      dataIndex: 'fed_uuin',
      sorter: { compare: (a, b) => a.fed_uuin - b.fed_uuin }

    },
    {
      key: 'composition',
      title: 'Composition',
      dataIndex: 'composition',
      sorter: { compare: (a, b) => a.fed_uuin - b.fed_uuin }

    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      sorter: { compare: (a, b) => a.fed_uuin - b.fed_uuin }

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
      </ActionComponent>
    );
  }

  useEffect(() => {
    getAllFlavours();
    // eslint-disable-next-line
  }, [pagination, filters]);

  const getAllFlavours = () => {
    let payload = {
      start: pagination.current - 1,
      length: pagination.pageSize,
      sort_name: pagination.sortName,
      sort_type: pagination.sortType,
      filters
    };
    makeRequest(setLoader, getFlavours, payload, onSuccess, null);
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

  //deleted multi Items
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      delItems = []
      delItems = selectedRowKeys
    },
  };
  // Create component modal
  const onCreate = () => {
    setChildComponent(<CreateFlavour onCreated={onCreated} />);
  }

  const onCreated = (res) => {
    if (res) {
      history.push(`/component-management/users/edit/${res.data.object.id}`);
    }
    setChildComponent(null);
  }



  const onView = (record) => {
    history.push(`/component-management/users/view/${record.id}`);
  }

  const onEdit = (record) => {
    history.push(`/component-management/users/edit/${record.id}`);
  }

  const onDelete = (record) => {
    let index = delItems.findIndex(o => o === record.id);
    if (index === -1) {
      delItems.push(record.id)
    }
    const payload = { "ids": delItems };
    makeRequest(setLoader, deleteFlavour, payload, onDeleteSuccess, onError)
  }
  const onDeleteSuccess = (response, msg) => {
    getAllFlavours()
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
        <FilterComponent filters={availableFilters} onFilter={setFilters} api={getFilters} />
       
        
        <SelectionTable loader={loader} columns={columns} dataSource={dataSource} pagination={{ ...pagination, total: totalRecords }} rowSelection={rowSelection} />
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
    key: 'manufacturer_id',
    placeholder: 'Manufacturer name',
    type: 'select',
    data_key: 'manufacturers',

  },
  {
    key: 'manufacturer_ref',
    placeholder: 'Ref.(Manufacturer)',
    type: 'text',

  },
  {
    key: 'fed_uuin',
    placeholder: 'FED UUIN',
    type: 'text',
  }, {
    key: 'composition',
    placeholder: 'Composition',
    type: 'select',
    data_key: 'composition'
  }
  , {
    key: 'is_active',
    placeholder: 'Status',
    type: 'select',
    data_key: 'Status'
  }

];
