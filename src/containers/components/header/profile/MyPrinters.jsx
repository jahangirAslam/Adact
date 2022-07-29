import { ActionComponent, BodyComponent, SelectionTable } from "@comps/components";
import { makeRequest, notify, removeById } from "@utils/helpers";
import { Button, Col } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const MyPrinters = () => {
    var delItems = []
    const [loader, setLoader] = useState(false);
    const history = useHistory();
    const [filters, setFilters] = useState({});
    const [dataSource, setDataSource] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [childComponent, setChildComponent] = useState(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 25,
        sortName: 'id',
        sortType: 'desc'
    });

    const columns = [
        {
            key: 'name',
            title: ' Name',
            dataIndex: 'name',
            sorter: true,
        },
        {
            key: 'discription',
            title: 'Discription',
            dataIndex: 'discription',
            sorter: true,
        },
        {
            key: 'global_settings',
            title: 'Global Settings',
            dataIndex: 'global_setting',
            sorter: true,
        },
        {
            key: 'this_pc',
            title: 'This PC',
            dataIndex: 'this_pc',
            sorter: true,
        },
        
        {
            key: "actions",
            title: 'Actions',
            render: (record) => ActionComponent({ each: record, onEdit: onEdit, onDelete: onDelete })
        },
    ];

    useEffect(() => {
        getAllCustomers();
        // eslint-disable-next-line
    }, [pagination, filters]);

    const getAllCustomers = () => {
        let payload = {
            start: pagination.current - 1,
            length: pagination.pageSize,
            sort_name: pagination.sortName,
            sort_type: pagination.sortType,
            filters: { "type": "customers" }
        };
        makeRequest(setLoader,  payload, onSuccess, null);
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
        setChildComponent( onCreated={onCreated} )
    }

    const onCreated = (res) => {
        if (res) {
            history.push(`/third-party/customers/edit/${res.data.object.id}`);
        }
        setChildComponent(null);
    }

    const onEdit = (record) => {
        history.push(`/third-party/customers/edit/${record.id}`);
    }

    const onDelete = (record) => {
        makeRequest(setLoader, record.id, onDeleteSuccess,
            onError)
    }

    const onDeleteSuccess = (response, msg) => {
        setDataSource(removeById(dataSource, response.id));
        notify(msg.msg)
    }

    const onError = (error, msg) => {
        notify(msg.message)
    }
    ////
    const rowSelection = {
        onChange: (selectedRowKeys) => {
            delItems = []
            delItems = selectedRowKeys
        },
    };

    return (
        <>
            {childComponent}
            <BodyComponent>
            <Col span={24}>
          <h2>Printer Settings</h2>
          <Col className="devicesHeaders" span={24}>
            <Button className="devicesBtn" type="primary">
              Apply
            </Button>
          </Col>
        </Col>
                <SelectionTable loader={loader} columns={columns} dataSource={dataSource} pagination={{ ...pagination, total: totalRecords }} rowSelection={rowSelection} />
            </BodyComponent>
        </>
    );
}


export default MyPrinters;


