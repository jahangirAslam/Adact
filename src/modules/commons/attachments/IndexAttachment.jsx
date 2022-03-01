import React, { useState, useEffect } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import {  BodyComponent, TableComponent, ActionComponent, CreateButton } from "@comps/components";
import { makeRequest, formatCompleteDataTime, notify, removeById, replaceById } from "@utils/helpers";
import { getAttachments,  deleteAttachment, downloadAttachmentRequest, downloadFileS3 } from "./requests";
import CreateAttachment from "./components/CreateAttachment";
import EditAttachment from "./components/EditAttachment";


const IndexAttachment = (props) => {

  const [loader, setLoader] = useState(false);

  const [dataSource, setDataSource] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
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
        <Button className="da-px-10 da-my-0" type="link" size="middle" onClick={ () => downloadAttachment(record) }><DownloadOutlined className="icon-style da-text-color-success-1" /></Button>
      </ActionComponent>
    );
  }

  useEffect(() => {
    getAllAttachments();
    // eslint-disable-next-line
  }, [pagination]);

  const downloadAttachment = (record) => {
    makeRequest(setLoader, downloadAttachmentRequest, record.id, onDownloadSuccess, onDownloadError);
  }

  const onDownloadSuccess = (res,response) => {
    downloadFileS3(response.data);
    notify("Attachment Downloaded");
  }
  const onDownloadError = (res,response) => {
    notify("Error While Downloaded");
  }

  const getAllAttachments = () => {
    let payload = {
      start: pagination.current - 1,
      length: pagination.pageSize,
      sort_name: pagination.sortName,
      sort_type: pagination.sortType,
      filters : {"is_used":true,"type": props.type}
    };
    makeRequest(setLoader, getAttachments, payload, onSuccess, null);
  }

  const onSuccess = (response) => {
    setTotalRecords(response.recordsTotal);
    setDataSource(response.data);
  }

  const onEdit = (record) => {
    setChildComponent(<EditAttachment onUpdated={ onUpdated } id={record.id} />);
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
    setChildComponent(<CreateAttachment onCreated={ onCreated } />);
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
    makeRequest(setLoader, deleteAttachment, record.id, onDeleteSuccess,
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
      <div className="da-text-right da-mt-12 da-mb-12"><CreateButton onClick={onCreate} /></div>
      <BodyComponent>
        <TableComponent loader={ loader } columns={ columns } dataSource={ dataSource } pagination={ { ...pagination, total: totalRecords } } onChange={ handleTableChange } />
      </BodyComponent>
    </>
  );
}

export default IndexAttachment;
