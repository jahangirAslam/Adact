import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { ActionComponent, BodyComponent, CreateButton, FilterComponent, HeaderComponent, SelectionTable } from "@comps/components";
import { makeRequest, notify } from "@utils/helpers";
import { Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CreateTest from "./components/CreateTest";
import { deleteItems, getAllItems, getFilters } from "./components/request";

const pageConfig = {
    headers: {
        title: "Your Business",
        breadcrumb: [
            {
                name: "Business",
            }
        ]
    }
}

const IndexBusiness = () => {
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
            title: 'Third Party Name ',
            dataIndex: 'name',
            sorter: true,
        },
        {
            key: 'country_name',
            title: 'Country',
            dataIndex: 'country_name',
            sorter: true,
        },
        {
            key: 'email',
            title: 'email',
            dataIndex: 'email',
            sorter: true,
        },
        {
            key: 'first_address',
            title: 'Address',
            dataIndex: 'first_address',
            sorter: true,
        },
        {
            key: 'phone',
            title: 'Contact',
            dataIndex: 'phone',
            sorter: true,
        },
        {
            key: 'account',
            title: 'Account',
            dataIndex: 'account',
            sorter: true,
        },
        {
            key: 'status',
            title: 'Status',
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
        makeRequest(setLoader, getAllItems, payload, onSuccess, null);
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
    //deleted multi Items
    const rowSelection = {
        onChange: (selectedRowKeys) => {
            delItems = []
            delItems = selectedRowKeys
        },
    };

    // Create component modal
    const onCreate = () => {
        setChildComponent(<CreateTest onCreated={onCreated} />)
    }

    const onCreated = (res) => {
        if(res){
            history.push(`/settings/business/edit/${res.data.object.id}`);
        }
        setChildComponent(null);
    }
    const onView = (record) => {
        history.push(`/settings/business/view/${record.id}`);

    }
    const onEdit = (record) => {
        history.push(`/settings/business/edit/${record.id}`);
    }

    const onDelete = (record) => {
        let index = delItems.findIndex(o => o === record.id);
        if (index === -1) {
            delItems.push(record.id)
        }
        const payload = { "ids": delItems };
        makeRequest(setLoader, deleteItems, payload, onDeleteSuccess, onError)
    }

    const onDeleteSuccess = (response, msg) => {
        getProducts()
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
                <SelectionTable loader={loader} columns={columns} dataSource={dataSource} pagination={{ ...pagination, total: totalRecords }} onChange={handleTableChange} rowSelection={rowSelection} />
            </BodyComponent>
        </>
    );
}

export default IndexBusiness;

const availableFilters = [

    {
        key: 'name',
        placeholder: 'Third Party Name',
        type: 'text',
        data_key: 'name'
    },
    {
        key: 'country_id',
        placeholder: 'Country Name',
        type: 'select',
        data_key: 'countries'
    },
    {
        key: 'email',
        placeholder: 'Email',
        type: 'text',
        data_key: 'email'
    },
    {
        key: 'status',
        placeholder: 'Status',
        type: 'select',
        data_key: 'status'
    },


];
