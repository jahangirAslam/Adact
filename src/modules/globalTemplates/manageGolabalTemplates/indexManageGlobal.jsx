import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {Tag } from "antd";
import { HeaderComponent, BodyComponent, TableComponent, ActionComponent, CreateButton, FilterComponent } from "@comps/components";
import { makeRequest, removeById, formatCompleteDataTime, notify } from "@utils/helpers";
import { getChemicalCompounds, deleteChemicalCompound, getFilters } from "./requests";
import CreateChemicalCompound from "./components/CreateChemicalCompound";

const pageConfig = {
    headers: {
        title: "Manage Global Templates",
        breadcrumb: [
            {
                name: "Manage Global Templates"
                // path: "/component-management/chemical-compounds"
            }
        ]
    }
}

const IndexManageGlobal = () => {

    const [loader, setLoader] = useState(false);
    const history = useHistory();
    const [dataSource, setDataSource] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [filters, setFilters] = useState({});
    const [childComponent, setChildComponent] = useState(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 25,
        sortName: 'id',
        sortType: 'desc'
    });

    const columns = [
      {
        key: "subject",
        title: "Subject",
        dataIndex: "subject",
        sorter: true,
      },
      {
        key: "master_file",
        title: "Table of Content",
        dataIndex: "master_file",
        sorter: true,
      },
      {
        key: "report_level",
        title: "Report Level",
        dataIndex: "report_level",
        sorter: true,
      },
      {
        key: "is_active",
        title: "status",
        dataIndex: "is_active",
        render: (is_active) => {
          let color = is_active ? "green" : "red";
          let text = is_active ? "ACTIVE" : "INACTIVE";
          return <Tag color={color}>{text}</Tag>;
        },
      },
      {
        key: "last_updated",
        title: "Last Updated",
        dataIndex: "last_updated",
        sorter: true,
        render: (created_at) => {
          return formatCompleteDataTime(created_at);
        },
      },
      {
        key: "last_updated_by",
        title: "Last Updated By",
        dataIndex: "last_updated_by",
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
      getAllChemicalCompounds();
      // eslint-disable-next-line
    }, [pagination, filters]);

    const getAllChemicalCompounds = () => {
        let payload = {
          start: pagination.current - 1,
          length: pagination.pageSize,
          sort_name: pagination.sortName,
          sort_type: pagination.sortType,
          filters,
        };
        makeRequest(setLoader, getChemicalCompounds, payload, onSuccess, null);
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
       setChildComponent(<CreateChemicalCompound onCreated={onCreated} />)
    }

    const onCreated = (res) => {
        if(res){
            history.push(`/global-template/manage-global-templates/edit/${res.data.object.id}`);
        }
        setChildComponent(null);
    }

    const onEdit = (record) => {
      history.push(`/global-template/manage-global-templates/edit/${record.id}`);
    }

    const onDelete = (record) => {
        makeRequest(setLoader, deleteChemicalCompound, record.id, onDeleteSuccess,
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
          <FilterComponent
            filters={availableFilters}
            onFilter={setFilters}
            api={getFilters}
          />
          <TableComponent
            loader={loader}
            columns={columns}
            dataSource={dataSource}
            pagination={{ ...pagination, total: totalRecords }}
            onChange={handleTableChange}
          />
        </BodyComponent>
      </>
    );
}

export default IndexManageGlobal;

const availableFilters = [
  {
    key: "subject",
    placeholder: "Subject",
    type: "text",
  },
  {
    key: "master_file",
    placeholder: "Table Of Content",
    data_key:"Table_of_content",
    type: "select",
  },
  {
    key: "status",
    placeholder: "Select Status",
    type: "select",
    data_key: "status",
  },
  {
    key: "last_updated_by",
    placeholder: "Last Updated By",
    type: "text",
    data_key: "all_customers",
  },
];
