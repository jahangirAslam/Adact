import React, { useState, useEffect } from "react";
import { BodyComponent, TableComponent, ActionComponent, CreateButton } from "@comps/components";
import { makeRequest, removeById, formatCompleteDataTime, notify, replaceById } from "@utils/helpers";
import { getFacilities,deleteFacility } from "../../../../commons/facilities/requests";
import CreateFacility from "../../../../commons/facilities/components/CreateFacility";
import EditFacility from "../../../../commons/facilities/components/EditFacility";
import ViewFacility from "../../../../commons/facilities/components/ViewFacility";
import CreateFormulation from "./CreateFormulation";


const Formulation = (props) => {

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
            key: 'chemical_substance ',
            title: 'Chemical Substance ',
            dataIndex: 'chemical_substance',
            sorter: true,
        },
        {
            key: ' cas_number',
            title: 'CAS Number ',
            dataIndex: 'cas_number',
            sorter: true,
        },
        {
            key: 'type ',
            title: 'Type ',
            dataIndex: 'type',
            sorter: true,
        },
        {
            key: 'insight ',
            title: 'Insight ',
            dataIndex: 'insight',
            sorter: true,
        },
        {
            key: "actions",
            title: "Actions",
            render: (record) =>
              ActionComponent({ each: record, onEdit: onEdit, onDelete: onDelete }),
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
        setChildComponent(<CreateFormulation onCreated={onCreated} type={props.type} />);
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
           {childComponent}
            <div className="da-text-right da-mt-12 da-mb-12"><CreateButton onClick={onCreate} /></div>
            <BodyComponent>
                <TableComponent loader={loader} columns={columns} dataSource={dataSource} pagination={{ ...pagination, total: totalRecords }} onChange={handleTableChange} />
            </BodyComponent>
        </>
    );
}

export default Formulation;
