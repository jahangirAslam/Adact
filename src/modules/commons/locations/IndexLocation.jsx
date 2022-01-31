import React, { useState, useEffect } from "react";
import { HeaderComponent, BodyComponent, TableComponent, ActionComponent, CreateButton } from "@comps/components";
import { makeRequest, removeById, formatCompleteDataTime, notify, replaceById } from "@utils/helpers";
import { getLocations, deleteLocation } from "./requests";
import CreateLocation from "./components/CreateLocation.jsx";
import EditLocation from "./components/EditLocation.jsx";
import ViewLocation from "./components/ViewLocation.jsx";

const pageConfig = {
    headers: {
        title: "Location",
        breadcrumb: [
            {
                name: "Location",
                path: "/common/locations"
            }
        ]
    }
}

const IndexLocation = () => {

    const [loader, setLoader] = useState(false);

    const [dataSource, setDataSource] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 25,
        sortName: 'id',
        sortType: 'desc'
    });

    const [childComponent, setChildComponent] = useState(null);

    const columns = [
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
        },
        {
            key: 'city',
            title: 'City',
            dataIndex: 'city',
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
            render: (record) => ActionComponent({ each: record, onView: onView, onEdit: onEdit, onDelete: onDelete })
        },
    ];

    useEffect(() => {
        getAllLocations();
        // eslint-disable-next-line
    }, [pagination]);

    const getAllLocations = () => {
        let payload = {
            start: pagination.current - 1,
            length: pagination.pageSize,
            sort_name: pagination.sortName,
            sort_type: pagination.sortType,
        };
        makeRequest(setLoader, getLocations, payload, onSuccess, null);
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
        setChildComponent(<CreateLocation onCreated={ onCreated } />);
    }
    const onCreated = (res) => {
        if (res) {
            setDataSource([...dataSource, res]);
        }
        setChildComponent(null);
    }


    const onView = (record) => {
        setChildComponent(<ViewLocation onUpdated={ onUpdated } id={ record.id } />);
    }

    const onEdit = (record) => {
        setChildComponent(<EditLocation onUpdated={ onUpdated } id={ record.id } />);
    }

    const onUpdated = (res) => {
        if (res) {
            setDataSource(replaceById(dataSource, res));
        }
        setChildComponent(null);
    }

    const onDelete = (record) => {
        makeRequest(setLoader, deleteLocation, record.id, onDeleteSuccess,
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
                <TableComponent loader={ loader } columns={ columns } dataSource={ dataSource } pagination={ { ...pagination, total: totalRecords } } onChange={ handleTableChange } />
            </BodyComponent>
        </>
    );
}

export default IndexLocation;
