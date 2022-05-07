import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { HeaderComponent, BodyComponent, TableComponent, ActionComponent, CreateButton, FilterComponent } from "@comps/components";
import { makeRequest, removeById, formatCompleteDataTime, notify } from "@utils/helpers";
import { getCustomers, deleteCustomer, getFilters } from "../../thirdPartyManagement/customers/requests";
import CreateCustomer from "../../thirdPartyManagement/customers/components/CreateCustomer";

const pageConfig = {
    headers: {
        title: "Customers",
        breadcrumb: [
            {
                name: "Customers",
                path: "/third-party/customers"
            }
        ]
    }
}

const IndexProducts = () => {

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
        makeRequest(setLoader, getCustomers, payload, onSuccess, null);
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
        setChildComponent(<CreateCustomer onCreated={onCreated} />)
    }

    const onCreated = (res) => {
        if (res) {
            history.push(`/third-party/customers/edit/${res.id}`);
        }
        setChildComponent(null);
    }

    const onEdit = (record) => {
        history.push(`/third-party/customers/edit/${record.id}`);
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

export default IndexProducts;

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
