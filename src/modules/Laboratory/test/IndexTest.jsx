import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { ActionComponent, BodyComponent, CreateButton, FilterComponent, HeaderComponent, TableComponent } from "@comps/components";
import { makeRequest, notify, removeById } from "@utils/helpers";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CreateTest from "./components/CreateTest";
import { deleteProduct, getAllProducts, getFilters } from "./components/request";

const pageConfig = {
    headers: {
        title: "Laboratory",
        breadcrumb: [
            {
                name: "Laboratory",
            }
        ]
    }
}

const IndexTest = () => {

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
            key: 'laboratory_name',
            title: 'laboratory_name',
            dataIndex: 'laboratory_name',
            sorter: true,
        },
        {
            key: 'product_name',
            title: 'product_name',
            dataIndex: 'product_name',
            sorter: true,
        },
        {
            key: 'user_name',
            title: 'user_name',
            dataIndex: 'user_name',
            sorter: true,
        },
        {
            key: 'type',
            title: 'type',
            dataIndex: 'type',
            sorter: true,
        },
        {
            key: 'created_by',
            title: 'created_by',
            dataIndex: 'created_by',
            sorter: true,
        },
        {
            key: 'status',
            title: 'status',
            dataIndex: 'status',
            sorter: true,
        },
        {
            key: 'test_ref',
            title: 'test_ref',
            dataIndex: 'test_ref',
            sorter: true,
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
        getProducts();
        // eslint-disable-next-line
    }, [pagination, filters]);

    const getProducts = () => {
        let payload = {
            start: pagination.current - 1,
            length: pagination.pageSize,
            sort_name: pagination.sortName,
            sort_type: pagination.sortType,
            filters
        };
        makeRequest(setLoader, getAllProducts, payload, onSuccess, null);
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
        setChildComponent(<CreateTest onCreated={onCreated} />)
    }

    const onCreated = (each) => {
        if (!each) {
            setChildComponent(null);
        }
        getProducts();
    debugger

    }
    const onView = (record) => {
        history.push(`/products/product/view/${record.id}`);

    }
    const onEdit = (record) => {
        history.push(`/products/product/edit/${record.id}`);
    }

    const onDelete = (record) => {
        makeRequest(setLoader, deleteProduct, record.id, onDeleteSuccess,
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
                <FilterComponent filters={availableFilters} onFilter={setFilters} api={getFilters} />
                <TableComponent loader={loader} columns={columns} dataSource={dataSource} pagination={{ ...pagination, total: totalRecords }} onChange={handleTableChange} />
            </BodyComponent>
        </>
    );
}

export default IndexTest;

const availableFilters = [
    
    {
        key: 'name',
        placeholder: 'Name',
        type: 'text',
    },
    

];
