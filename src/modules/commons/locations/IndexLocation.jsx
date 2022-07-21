import {
    ActionComponent, BodyComponent, CreateButton,
    FilterComponent, TableComponent
} from "@comps/components";
import {
    makeRequest, notify, removeById, replaceById
} from "@utils/helpers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateLocation from "./components/CreateLocation.jsx";
import EditLocation from "./components/EditLocation.jsx";
import ViewLocation from "./components/ViewLocation.jsx";
import { deleteLocation, getFilters, getLocations } from "./requests";

const IndexLocation = (props) => {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [filters, setFilters] = useState({ companies_id: id });
  const [dataSource, setDataSource] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 25,
    sortName: "id",
    sortType: "desc",
  });

  const [childComponent, setChildComponent] = useState(null);

  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      key: "first_address",
      title: "Address",
      dataIndex: "first_address",
      sorter: true,
    },

    {
      key: "city",
      title: "Town/City",
      dataIndex: "city",
      sorter: true,
    },
    {
      key: "country_name",
      title: "Country",
      dataIndex: "country_name",
      sorter: true,
    },
    {
      key: "state",
      title: "County",
      dataIndex: "state",
      sorter: true,
    },
    {
      key: "zipcode",
      title: "Post Code",
      dataIndex: "zipcode",
      sorter: true,
    },

    {
      key: "actions",
      title: "Actions",
      render: (record) =>
        ActionComponent({ each: record, onEdit: onEdit, onDelete: onDelete }),
    },
  ];

  useEffect(() => {
    getAllLocations();
    // eslint-disable-next-line
  }, [pagination, filters]);

  const getAllLocations = () => {
    let payload = {
      start: pagination.current - 1,
      length: pagination.pageSize,
      sort_name: pagination.sortName,
      sort_type: pagination.sortType,
      filters: { type: props.type },
      filters,
    };
    makeRequest(setLoader, getLocations, payload, onSuccess, null);
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
    setChildComponent(
      <CreateLocation onCreated={onCreated} type={props.type} />
    );
  };
  const onCreated = (res) => {
    if (res) {
      getAllLocations();
    }
    setChildComponent(null);
  };

  const onView = (record) => {
    setChildComponent(<ViewLocation onUpdated={onUpdated} id={record.id} />);
  };

  const onEdit = (record) => {
    setChildComponent(<EditLocation onUpdated={onUpdated} id={record.id} />);
  };

  const onUpdated = (res) => {
    if (res) {
      setDataSource(replaceById(dataSource, res));
    }
    setChildComponent(null);
  };

  const onDelete = (record) => {
    makeRequest(setLoader, deleteLocation, record.id, onDeleteSuccess, onError);
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
      <div className="da-text-right da-mt-12 da-mb-12">
        <CreateButton onClick={onCreate} />
      </div>
      <BodyComponent>
        <FilterComponent
          filters={availableFilters}
          onFilter={setFilters}
          api={getFilters}
        />
        <TableComponent
          className="table-show"
          loader={loader}
          columns={columns}
          dataSource={dataSource}
          pagination={{ ...pagination, total: totalRecords }}
          onChange={handleTableChange}
        />
      </BodyComponent>
    </>
  );
};

export default IndexLocation;

const availableFilters = [
  {
    key: "name",
    placeholder: "Name",
    type: "text",
  },
];
