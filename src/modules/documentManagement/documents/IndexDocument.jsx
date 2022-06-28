import React, { useState, useEffect } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { HeaderComponent, BodyComponent, TableComponent, ActionComponent, CreateButton, FilterComponent } from "@comps/components";
import { makeRequest, formatCompleteDataTime, notify, removeById, replaceById } from "@utils/helpers";
import { getDocuments, getFilters, deleteDocument, downloadDocumentRequest, downloadFileS3 } from "./requests";
import CreateDocument from "./components/CreateDocument";
import EditDocument from "./components/EditDocument";

const pageConfig = {
  headers: {
    title: "Documents",
    breadcrumb: [
      {
        name: "Documents",
        path: "/document-management/documents"
      }
    ]
  }
}

const IndexDocument = () => {

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
    return (
      <ActionComponent each={ record } onEdit={ onEdit } onDelete={ onDelete }>
        <Button className="da-px-10 da-my-0" type="link" size="middle" onClick={ () => downloadDocument(record) }><DownloadOutlined className="icon-style da-text-color-success-1" /></Button>
      </ActionComponent>
    );
  }

  useEffect(() => {
    getAllDocuments();
    // eslint-disable-next-line
  }, [pagination, filters]);

  const downloadDocument = (record) => {
    makeRequest(setLoader, downloadDocumentRequest, record.id, onDownloadSuccess, onDownloadError);
  }

  const onDownloadSuccess = (res,response) => {
    downloadFileS3(response.data);
    notify("Document Downloaded");
  }
  const onDownloadError = (res,response) => {
    notify("Error While Downloaded");
  }

  const getAllDocuments = () => {
    let payload = {
      start: pagination.current - 1,
      length: pagination.pageSize,
      sort_name: pagination.sortName,
      sort_type: pagination.sortType,
      filters : {"is_used":true}
    };
    makeRequest(setLoader, getDocuments, payload, onSuccess, null);
  }

  const onSuccess = (response) => {
    setTotalRecords(response.recordsTotal);
    setDataSource(response.data);
  }

  const onEdit = (record) => {
    setChildComponent(<EditDocument onUpdated={ onUpdated } id={record.id} />);
  }

  const onUpdated = (each) => {
    if(each) {
      setDataSource(replaceById(dataSource, each.object));
    }
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
    setChildComponent(<CreateDocument onCreated={ onCreated } />);
  }

  const onCreated = (each) => {
    if (!each) {
      setChildComponent(null);
    }else{
      setDataSource([...dataSource, each.object]);
      setChildComponent(null);
    }
  }

  const onDelete = (record) => {
    makeRequest(setLoader, deleteDocument, record.id, onDeleteSuccess,
      onError)
  }

  const onDeleteSuccess = (response, msg) => {
    setDataSource(removeById(dataSource, response.id));
    notify(msg.msg)
  }

  const onError = (error, msg) => {
    notify(error)
  }

  return (
    <>
      { childComponent }
      <HeaderComponent headers={ pageConfig.headers }>
        <CreateButton onClick={ onCreate } />
      </HeaderComponent>
      <BodyComponent>
        <FilterComponent filters={ availableFilters } onFilter={ setFilters } api={ getFilters } />
        <TableComponent  className="table-show" loader={ loader } columns={ columns } dataSource={ dataSource } pagination={ { ...pagination, total: totalRecords } } onChange={ handleTableChange } />
      </BodyComponent>
    </>
  );
}

export default IndexDocument;

const availableFilters = [
  {
    key: 'name',
    placeholder: 'User Name',
    type: 'text',
  }
];
