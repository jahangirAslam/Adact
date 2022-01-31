import React, { useState, useEffect } from "react";
import { BodyComponent, TableComponent, ActionComponent, CreateButton } from "@comps/components";
import { makeRequest, removeById, formatCompleteDataTime, notify, replaceById } from "@utils/helpers";
import { getContacts, deleteContact } from "./requests";
import CreateContact from "./components/CreateContact.jsx";
import EditContact from "./components/EditContact.jsx";
import ViewContact from "./components/ViewContact.jsx";

const pageConfig = {
    headers: {
        title: "Contacts",
        breadcrumb: [
            {
                name: "Contacts",
                path: "/common/contacts"
            }
        ]
    }
}

const IndexContact = (props) => {

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
            dataIndex: 'first_name',
            sorter: true,
        },
        {
            key: 'mobile',
            title: 'Mobile',
            dataIndex: 'mobile',
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
        getAllContacts();
        // eslint-disable-next-line
    }, [pagination]);

    const getAllContacts = () => {
        let payload = {
            start: pagination.current - 1,
            length: pagination.pageSize,
            sort_name: pagination.sortName,
            sort_type: pagination.sortType,
            filters : {"type": props.type}
        };
        makeRequest(setLoader, getContacts, payload, onSuccess, null);
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
        setChildComponent(<CreateContact onCreated={ onCreated } type={props.type}/>);
    }
    const onCreated = (res) => {
        if (res) {
            setDataSource([...dataSource, res]);
        }
        setChildComponent(null);
    }


    const onView = (record) => {
        setChildComponent(<ViewContact onUpdated={ onUpdated } id={ record.id } />);
    }

    const onEdit = (record) => {
        setChildComponent(<EditContact onUpdated={ onUpdated } id={ record.id } />);
    }

    const onUpdated = (res) => {
        if (res) {
            setDataSource(replaceById(dataSource, res));
        }
        setChildComponent(null);
    }

    const onDelete = (record) => {
        makeRequest(setLoader, deleteContact, record.id, onDeleteSuccess,
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
            <div className="da-text-right da-mt-12 da-mb-12"><CreateButton onClick={ onCreate } /></div>
            <BodyComponent>
                <TableComponent loader={ loader } columns={ columns } dataSource={ dataSource } pagination={ { ...pagination, total: totalRecords } } onChange={ handleTableChange } />
            </BodyComponent>
        </>
    );
}

export default IndexContact;
