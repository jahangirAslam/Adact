import {
  ActionComponent, BodyComponent, CreateButton,
  FilterComponent, HeaderComponent, TableComponent
} from "@comps/components";
import {
  formatCompleteDataTime, makeRequest, notify, removeById
} from "@utils/helpers";
import { Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CreateSubstance from "./components/CreateSubstance";
import { deleteSubstance, getFilters, getSubstances } from "./requests";

const pageConfig = {
  headers: {
    title: "Chemical Substances",
    breadcrumb: [
      {
        name: "Substances",
        path: "/component-management/substances",
      },
    ],
  },
};

const IndexSubstance = () => {
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const [dataSource, setDataSource] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [childComponent, setChildComponent] = useState(null);
  const [filters, setFilters] = useState({});

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
      sorter: (a, b) => a && a.name.length - b && b.name.length,

    },
    {
      key: "cas_number",
      title: "CAS Number",
      dataIndex: "cas_number",
      sorter: (a, b) => a && a.cas_number.length - b && b.cas_number.length,

    },
    {
      key: "fema_number",
      title: "FEMA",
      dataIndex: "fema_number",
      sorter: {compare: (a, b) => a.fema_number - b.fema_number}

    },
    {
      key: "reach_number",
      title: "Reach Number",
      dataIndex: "reach_number",
      sorter: {compare: (a, b) => a.reach_number - b.reach_number}

    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'is_active',
      sorter: (a, b) => a && a.status.length - b && b.status.length,

      render: (is_active) => {
        let color = is_active ? 'green' : 'red';
        let text = is_active ? 'ACTIVE' : 'INACTIVE';
        return (
          <Tag color={color} >{text}</Tag>
        );
      }
    },

    {
      key: "actions",
      title: "Actions",
      render: (record) =>
        ActionComponent({ each: record, onView: onView, onEdit: onEdit, onDelete: onDelete }),
    },
  ];

  useEffect(() => {
    getAllSubstances();
    // eslint-disable-next-line
  }, [pagination, filters]);

  const getAllSubstances = () => {
    let payload = {
      start: pagination.current - 1,
      length: pagination.pageSize,
      sort_name: pagination.sortName,
      sort_type: pagination.sortType,
      filters
    };
    makeRequest(setLoader, getSubstances, payload, onSuccess, null);
  };

  const onSuccess = (response) => {
    setTotalRecords(response.recordsTotal);
    setDataSource(response.data);
  };

  

  // Create component modal
  const onCreate = () => {
    setChildComponent(<CreateSubstance onCreated={onCreated} />);
  };

  const onCreated = (res) => {
    if(res){
        history.push(`/component-management/substances/edit/${res.data.object.id}`);
    }
    setChildComponent(null);
}

  const onEdit = (record) => {
    history.push(`/component-management/substances/edit/${record.id}`);
  };
  const onView = (record) => {
    history.push(`/component-management/substances/view/${record.id}`);
  };

  const onDelete = (record) => {
    makeRequest(
      setLoader,
      deleteSubstance,
      record.id,
      onDeleteSuccess,
      onError
    );
  };

  const onDeleteSuccess = (response, msg) => {
    setDataSource(removeById(dataSource, response.id));
    notify(msg.msg);
  };

  const onError = (error, msg) => {
    notify(msg.message);
  };

  return (
    <>
      {childComponent}
      <HeaderComponent headers={pageConfig.headers}>
        <CreateButton onClick={onCreate} />
      </HeaderComponent>
      <BodyComponent>
        <FilterComponent filters={availableFilters} onFilter={setFilters} api={getFilters} />
        <TableComponent
          loader={loader}
          columns={columns}
          dataSource={dataSource}
          pagination={{ ...pagination, total: totalRecords }}
        />
      </BodyComponent>
    </>
  );
};

export default IndexSubstance;

const availableFilters = [
  {
    key: "name",
    placeholder: "Name",
    type: "text",
  },
  {
    key: "cas_number",
    placeholder: "CAS Number",
    type: "text",
  },
  {
    key: "fema_number",
    placeholder: "FEMA NO",
    type: "text",
  },
  {
    key: "reach_number",
    placeholder: "Reach No",
    type: "text",
  },
  {
    key: "reach_registration",
    placeholder: "Ingredient Status ",
    type: "select",
    data_key: 'ingredient_status_insights',

  },

];
