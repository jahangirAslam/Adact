import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { HeaderComponent, BodyComponent, TableComponent, ActionComponent, CreateButton, FilterComponent } from "@comps/components";
import { makeRequest, removeById, formatCompleteDataTime, notify } from "@utils/helpers";
import { getManufacturers, deleteManufacturer, getFilters } from "./requests";
import CreateManufacturer from "./components/CreateManufacturer";
import { Tag } from "antd";

const pageConfig = {
    headers: {
        title: "Manufacturers",
        breadcrumb: [
            {
                name: "Manufacturers",
                path: "/third-party/manufacturers"
            }
        ]
    }
}

const IndexManufacturer = () => {

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
            key: 'location_name',
            title: 'Country',
            dataIndex: 'location_name',
            sorter: true,
        },
        {
            key: 'Email',
            title: 'Email',
            dataIndex: 'Email',
            sorter: true,
        },
        {
            key: 'first_address',
            title: 'Address',
            dataIndex: 'first_address',
            sorter: true,
        },
        {
            key: 'Contact',
            title: 'Contact',
            dataIndex: 'Contact',
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
            sorter: true,
            render: (is_active) => {
              let color = is_active ? 'green' : 'red';
              let text = is_active ? 'ACTIVE' : 'INACTIVE';
              return (
                <Tag color={color} >{text}</Tag>
              );
            }
          },
        // {
        //     key: 'created_at',
        //     title: 'Create At',
        //     dataIndex: 'created_at',
        //     sorter: true,
        //     render: (created_at) => {
        //         return formatCompleteDataTime(created_at);
        //     }
        // },
        {
            key: "actions",
            title: 'Actions',
            render: (record) => ActionComponent({ each: record, onEdit: onEdit, onDelete: onDelete })
        },
    ];

    useEffect(() => {
        getAllManufacturers();
        // eslint-disable-next-line
    }, [pagination, filters]);

    const getAllManufacturers = () => {
        let payload = {
            start: pagination.current - 1,
            length: pagination.pageSize,
            sort_name: pagination.sortName,
            sort_type: pagination.sortType,
            filters : {"type": "Manufacturers"}
        };
        makeRequest(setLoader, getManufacturers, payload, onSuccess, null);
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
       setChildComponent(<CreateManufacturer onCreated={onCreated} />)
    }

    const onCreated = (res) => {
        if(res){
            debugger
            history.push(`/third-party/Manufacturers/edit/${res.data.object.id}`);
        }
        setChildComponent(null);
    }

    const onEdit = (record) => {
        history.push(`/third-party/Manufacturers/edit/${record.id}`);
    }

    const onDelete = (record) => {
        makeRequest(setLoader, deleteManufacturer, record.id, onDeleteSuccess,
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
        { childComponent }
            <HeaderComponent headers={ pageConfig.headers }>
                <CreateButton onClick={ onCreate } />
            </HeaderComponent>
            <BodyComponent>
            <FilterComponent filters={ availableFilters } onFilter={ setFilters } api={ getFilters } />
                <TableComponent loader={ loader } columns={ columns } dataSource={ dataSource } pagination={ { ...pagination, total: totalRecords } } onChange={ handleTableChange } />
            </BodyComponent>
        </>
    );
}

export default IndexManufacturer;

const availableFilters = [
    {
        key: 'name',
        placeholder: 'Name',
        type: 'text',
    },
    {
        key: 'name',
        placeholder: 'Country ',
        type: 'select',
        data_key:'country'
    },
    {
        key: 'name',
        placeholder: 'Email ',
        type: 'text',
    },
    {
        key: 'name',
        placeholder: 'Status ',
        type: 'select',
        data_key:'status'
    },
];