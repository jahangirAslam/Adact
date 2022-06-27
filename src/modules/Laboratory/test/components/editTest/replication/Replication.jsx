import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { ActionComponent, BodyComponent, CreateButton, FilterComponent, SelectionTable } from "@comps/components";
import { makeRequest, notify, removeById } from "@utils/helpers";
import { Col, Row, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//  import CreateRecipe from "./Replication";
import CreateReplication from "./CreateReplications";
// import { deleteFlavour, getFilters, getFlavours } from "./request";
import { deleteItems, getFilters, getAllItems } from "./component/request";



const Replication = (props) => {
    var delItems = []
    const history = useHistory();
    const [loader, setLoader] = useState(false);
    const [filters, setFilters] = useState({});
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
            key: 'batch_ref',
            title: 'Replication No',
            sorter:true,
            dataIndex: 'batch_ref',
        },
        {
            key: 'test_ref',
            title: 'Sub-Replication No',
            sorter:true,
            dataIndex: 'test_ref',
        },
        {
            key: 'type',
            title: 'Created',
            sorter:true,
            dataIndex: 'type',
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
            key: 'created_by',
            title: 'Tested Date',
            sorter:true,
            dataIndex: 'created_by',
        },
        {
            key: 'tested_date',
            title: 'Authorised',
            sorter:true,
            dataIndex: 'tested_date',
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
        makeRequest(setLoader, getAllItems, payload, onSuccess, null);
    }



    const onSuccess = (response) => {
        setTotalRecords(response.recordsTotal);
        setDataSource(response.data);
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
        setChildComponent(<CreateReplication onCreated={onCreated} product_id={props.product_id} />);
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
        makeRequest(setLoader, deleteItems, payload, onDeleteSuccess, onError)
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
                    <h4>Test Replications</h4>
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

export default Replication;

const availableFilters = [

    {
        key: 'laboratory_name',
        placeholder: 'Replication No',
        type: 'select',
        data_key: 'laboratory'
    },
    {
        key: 'customer_name',
        placeholder: 'Sub-Replication No',
        type: 'select',
        data_key: 'customers'
    },
    {
        key: 'product_name',
        placeholder: 'Created',
        type: 'select',
        data_key: 'product_name'
    },
    {
        key: 'test_ref',
        placeholder: 'Status',
        type: 'text',
    },
    {
        key: 'type',
        placeholder: 'Tested Date',
        type: 'select',
        data_key: 'types'
    },
    {
        key: 'status',
        placeholder: 'Authorised',
        type: 'select',
        data_key: 'status'
    },
    


];
