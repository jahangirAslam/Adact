import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { ActionComponent, BodyComponent, CreateButton, FilterComponent, SelectionTable } from "@comps/components";
import { makeRequest, notify, removeById } from "@utils/helpers";
import { Col, Row, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CreateRecipe from "../CreateTest";
import { deleteFlavour, getFilters, getFlavours } from "../../../../products/allProducts/components/editProduct/labTest/request";
import { deleteItems, getAllItems, getItem } from "./components/request";
import Create from "./components/Create";



const IndexSubmission = (props) => {
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
            key: 'submission_target',
            title: 'SUBMISSION Target',
            sorter: true,
            dataIndex: 'submission_target',
        },
        {
            key: 'submitted_products',
            title: 'SUBMISSION STATUS',
            sorter: true,
            dataIndex: 'submitted_products',
        },

        {
            key: 'date_of_request',
            title: 'DATE OF REQUEST',
            sorter: true,
            dataIndex: 'date_of_request',
        },
        // {
        //     key: 'submission_type',
        //     title: 'Type',
        //     sorter: true,
        //     dataIndex: 'submission_type',
        // },
        // {
        //     key: 'message',
        //     title: 'Message',
        //     sorter: true,
        //     dataIndex: 'message',
        // },
      
        {
            key: 'status_changes_at',
            title: 'Product to Submit As',
            sorter: true,
            dataIndex: 'status_changes_at',
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
            <ActionComponent each={record} onDelete={onDelete} onEdit={onEdit}  >
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
        setChildComponent(<Create onCreated={onCreated} product_id={props.product_id} />);
    }

    const onCreated = (res) => {
        if (res) {
            history.push(`/settings/business/submission/edit/${res.data.object.id}`);
        }
        setChildComponent(null);
    }

    const onEdit = (record) => {
        history.push(`/settings/business/submission/edit/${record.id}`);
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
                    <h4>Submission</h4>
                </Col>
                <CreateButton onClick={onCreate} />
            </Row>
            <BodyComponent>
                {/* <FilterComponent filters={availableFilters} onFilter={setFilters} api={getFilters} /> */}
                <SelectionTable loader={loader} columns={columns} dataSource={dataSource} pagination={{ ...pagination, total: totalRecords }} rowSelection={rowSelection} onChange={handleTableChange} />
            </BodyComponent>
        </>
    );
}

export default IndexSubmission;

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
