import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { ActionComponent, BodyComponent, CreateButton, FilterComponent, SelectionTable } from "@comps/components";
import { makeRequest, notify, removeById } from "@utils/helpers";
import { Col, Row, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CreateRecipe from "./CreateTest";
import { deleteFlavour, getFilters, getFlavours } from "./request";



const LabTest = (props) => {
    var delItems = []
    const history = useHistory();
    const [loader, setLoader] = useState(false);
    const [filters, setFilters] = useState({  filters : {product_id:props.product_id}  });
    const [dataSource, setDataSource] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        sortName: 'id',
        sortType: 'desc',
      
    });
    const [childComponent, setChildComponent] = useState(null);

    const columns = [
        {
            key: 'batch_ref',
            title: 'Batch Ref',
            sorter:true,
            dataIndex: 'batch_ref',
        },
        {
            key: 'test_ref',
            title: 'Test Ref',
            sorter:true,
            dataIndex: 'test_ref',
        },
        {
            key: 'type',
            title: 'Type',
            sorter:true,
            dataIndex: 'type',
        },
        {
            key: 'created_by',
            title: 'Created by',
            sorter:true,
            dataIndex: 'created_by',
        },
        {
            key: 'status',
            title: 'Status',
            sorter:true,
            dataIndex: 'is_active',
            render: (is_active) => {
                let color = is_active ? 'green' : 'red';
                let text = is_active ? 'ACTIVE' : 'INACTIVE';
                return (
                    <Tag color={color} >{text}</Tag>
                );
            }
        },
        {
            key: 'tested_date',
            title: 'Tested_date',
            sorter:true,
            dataIndex: 'tested_date',
        },
        {
            key: 'laboratory_name',
            title: 'Laboratory name',
            sorter:true,
            dataIndex: 'laboratory_name',
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
            <ActionComponent each={record} onDelete={onDelete} onEdit={onEdit} onView={onView} >
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

    // const onImported = (res) => {
    //     getAllFlavours();
    //     setChildComponent(null);
    // }


    //deleted multi Items
    const rowSelection = {
        onChange: (selectedRowKeys) => {
            delItems = []
            delItems = selectedRowKeys
        },
    };
    // Create component modal
    const onCreate = () => {
        setChildComponent(<CreateRecipe onCreated={onCreated} product_id={props.product_id} />);
    }

    const onCreated = (res) => {
        if(res){
            history.push(`/products/product-test/edit/${res.data.object.id}`);
        }
        setChildComponent(null);
    }

    const onEdit = (record) => {
        history.push(`/products/product-test/edit/${record.id}`);
    }
    const onView = (record) => {
        history.push(`/products/product-test/view/${record.id}`);

    }
    const onDelete = (record) => {
        let index = delItems.findIndex(o => o === record.id);
        if (index === -1) {
            delItems.push(record.id)
        }
        const payload = { "ids": delItems };
        makeRequest(setLoader, deleteFlavour, payload, onDeleteSuccess, onError)
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
    const onDeleteSuccess = (response, msg) => {
        getAllFlavours();
        notify(msg.msg)
    }

    const onError = (error, msg) => {
        //
    }

    return (
        < >
            {childComponent}
            <Row justify="space-between" className="da-pb-24" >
                <Col className="inner-form-heading" >
                    <h4>Laboratory Test</h4>
                </Col>
                <CreateButton onClick={onCreate} />
            </Row>
            <BodyComponent>
                <FilterComponent filters={availableFilters} onFilter={setFilters} api={getFilters} />
                <SelectionTable loader={loader} columns={columns} dataSource={dataSource} pagination={{ ...pagination, total: totalRecords }} rowSelection={rowSelection} onChange={handleTableChange} />
            </BodyComponent>
        </>
    );
}

export default LabTest;

const availableFilters = [

    {
        key: 'laboratory_name',
        placeholder: 'Laboratory Name',
        type: 'select',
        data_key: 'laboratory'
    },
    {
        key: 'customer_name',
        placeholder: 'Customer Name',
        type: 'select',
        data_key: 'customers'
    },
    {
        key: 'product_name',
        placeholder: 'Product Name',
        type: 'select',
        data_key: 'product_name'
    },
    {
        key: 'test_ref',
        placeholder: 'Test REF',
        type: 'text',
    },
    {
        key: 'type',
        placeholder: 'Type',
        type: 'select',
        data_key: 'types'
    },
    {
        key: 'status',
        placeholder: 'Status',
        type: 'select',
        data_key: 'status'
    },
    {
        key: 'current',
        placeholder: 'Current',
        type: 'select',
        data_key: 'current'
    },


];
