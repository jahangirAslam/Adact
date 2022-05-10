import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { HeaderComponent, BodyComponent, TableComponent, ActionComponent, CreateButton, FilterComponent } from "@comps/components";
import { makeRequest, removeById, formatCompleteDataTime, notify } from "@utils/helpers";
import CreateProduct from "./components/CreateProducts";
import { deleteCustomer, getAllProducts, getFilters } from "./components/request";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const pageConfig = {
    headers: {
        title: "eLiquid",
        breadcrumb: [
            {
                name: "eLiquid",
            }
        ]
    }
}

const IndexLiquid = () => {

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
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
        },
        {
            key: 'category_name',
            title: 'category_name',
            dataIndex: 'category_name',
            sorter: true,
        },
        {
            key: 'category_id',
            title: 'category_id',
            dataIndex: 'name',
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
            filters: { "type": "customers" }
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
        setChildComponent(<CreateProduct onCreated={onCreated} />)
    }

    const onCreated = (each) => {
        if (!each) {
            setChildComponent(null);
        }
        setDataSource([...dataSource, each.object]);
    }

    const onEdit = (record) => {
        history.push(`/products/product/edit/${record.id}`);
    }
    const onView = (record) => {
        history.push(`/products/product/view/${record.id}`);

    }

    const onDelete = (record) => {
        makeRequest(setLoader, deleteCustomer, record.id, onDeleteSuccess,
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

export default IndexLiquid;

const availableFilters = [
    {
        key: 'prduct_id',
        placeholder: 'Product ID',
        type: 'text',
    },
    {
        key: 'client',
        placeholder: 'Client Name',
        type: 'select',
    },
    {
        key: 'name',
        placeholder: 'Name',
        type: 'text',
    },
    {
        key: 'on_mark',
        placeholder: 'On Mark',
        type: 'text',
    },
    {
        key: 'withdrawn',
        placeholder: 'Withdrawn',
        type: 'select',
    },
    {
        key: 'type',
        placeholder: 'Type',
        type: 'text',
    },
    {
        key: 'insights',
        placeholder: 'Insights',
        type: 'select',
    },
];