import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { HeaderComponent, BodyComponent, TableComponent, ActionComponent, CreateButton, FilterComponent } from "@comps/components";
import { makeRequest, removeById, formatCompleteDataTime, notify } from "@utils/helpers";
import { getAllThirdParties, deleteAllThirdParty, getFilters } from "./requests";
import CreateAllThirdParty from "./components/CreateAllThirdParty";

const pageConfig = {
    headers: {
        title: "All Third Party",
        breadcrumb: [
            {
                name: "All Third Partys",
                path: "/third-party/all-third-parties"
            }
        ]
    }
}

const IndexAllThirdParty = () => {

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
            title: 'Adress',
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
            key: 'status',
            title: 'Status',
            dataIndex: 'status',
            sorter: true,
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
        getAllAllThirdPartys();
        // eslint-disable-next-line
    }, [pagination, filters]);

    const getAllAllThirdPartys = () => {
        let payload = {
            start: pagination.current - 1,
            length: pagination.pageSize,
            sort_name: pagination.sortName,
            sort_type: pagination.sortType,
            filters    
            };
        makeRequest(setLoader, getAllThirdParties, payload, onSuccess, null);
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
       setChildComponent(<CreateAllThirdParty onCreated={onCreated} />)
    }

    const onCreated = (res) => {
        if(res){
            history.push(`/third-party/all-third-parties/edit/${res.id}`);
        }
        setChildComponent(null);
    }

    const onEdit = (record) => {
        history.push(`/third-party/all-third-parties/edit/${record.id}`);
    }

    const onDelete = (record) => {
        makeRequest(setLoader, deleteAllThirdParty, record.id, onDeleteSuccess,
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

export default IndexAllThirdParty;

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