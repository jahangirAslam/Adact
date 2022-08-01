import React, { useState, useEffect } from "react";
import { BodyComponent, TableComponent, ActionComponent, CreateButton } from "@comps/components";
import { makeRequest, removeById, formatCompleteDataTime, notify, replaceById } from "@utils/helpers";
import { getFacilities,deleteFacility } from "../../../../commons/facilities/requests";
// import { getFacilities,deleteFacility } from "../../../../../../commons/facilities/requests";
// import CreateFacility from "../../../../../../commons/facilities/components/CreateFacility";
// import EditFacility from "../../../../../../commons/facilities/components/EditFacility.jsx";
// import ViewFacility from "../../../../../../commons/facilities/components/ViewFacility.jsx";
import CreateFacility from "../../../../commons/facilities/components/CreateFacility";
import EditFacility from "../../../../commons/facilities/components/EditFacility";
import ViewFacility from "../../../../commons/facilities/components/ViewFacility";


const Submission = (props) => {

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
            key: 'date ',
            title: 'Date ',
            dataIndex: 'date',
            sorter: true,
        },
        {
            key: 'message ',
            title: 'Message ',
            dataIndex: 'message',
            sorter: true,
        },
        {
            key: 'changes ',
            title: 'Changes ',
            dataIndex: 'changes',
            sorter: true,
        },
        {
            key: 'agent ',
            title: 'Agent ',
            dataIndex: 'agent',
            sorter: true,
        },
        {
            key: 'object ',
            title: 'Object ',
            dataIndex: 'object',
            sorter: true,
        },
        {
            key: 'type ',
            title: 'Type ',
            dataIndex: 'type',
            sorter: true,
        },
        {
            key: 'ip_address ',
            title: 'IP Address ',
            dataIndex: 'ip_address',
            sorter: true,
        },
        
        
    ];

    useEffect(() => {
        getAllFacilities();
        // eslint-disable-next-line
    }, [pagination]);

    const getAllFacilities = () => {
        let payload = {
            start: pagination.current - 1,
            length: pagination.pageSize,
            sort_name: pagination.sortName,
            sort_type: pagination.sortType,
            filters: { "type": "facility" }
        };
        makeRequest(setLoader, getFacilities, payload, onSuccess, null);
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
        setChildComponent(<CreateFacility onCreated={onCreated} type={props.type} />);
    }
    const onCreated = (res) => {
        if (res) {
            setDataSource([...dataSource, res]);
        }
        setChildComponent(null);
    }


    const onView = (record) => {
        setChildComponent(<ViewFacility onUpdated={onUpdated} id={record.id} />);
    }

    const onEdit = (record) => {
        setChildComponent(<EditFacility onUpdated={onUpdated} id={record.id} />);
    }

    const onUpdated = (res) => {
        if (res) {
            setDataSource(replaceById(dataSource, res));
        }
        setChildComponent(null);
    }

    const onDelete = (record) => {
        makeRequest(setLoader, deleteFacility, record.id, onDeleteSuccess,
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
           
            <BodyComponent>
                <TableComponent loader={loader} columns={columns} dataSource={dataSource} pagination={{ ...pagination, total: totalRecords }} onChange={handleTableChange} />
            </BodyComponent>
        </>
    );
}

export default Submission;
