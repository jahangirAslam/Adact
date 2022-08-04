import React, { useState, useEffect } from "react";
import { BodyComponent, TableComponent, ActionComponent, CreateButton } from "@comps/components";
import { makeRequest, removeById, formatCompleteDataTime, notify, replaceById } from "@utils/helpers";
// import { getFacilities, deleteFacility } from "./requests";
import { getFacilities,deleteFacility } from "../../../../../../commons/facilities/requests";
// import CreateFacility from "./components/CreateFacility.jsx";
import CreateFacility from "../../../../../../commons/facilities/components/CreateFacility";
import EditFacility from "../../../../../../commons/facilities/components/EditFacility.jsx";
import ViewFacility from "../../../../../../commons/facilities/components/ViewFacility.jsx";


const Submission = (props) => {

    // const [loader, setLoader] = useState(false);

    // const [dataSource, setDataSource] = useState([]);
    // const [totalRecords, setTotalRecords] = useState(0);
    // const [pagination, setPagination] = useState({
    //     current: 1,
    //     pageSize: 25,
    //     sortName: 'id',
    //     sortType: 'desc'
    // });

    // const [childComponent, setChildComponent] = useState(null);

    // const columns = [
    //     {
    //         key: 'submission_target ',
    //         title: 'Submission Target',
    //         dataIndex: 'name',
    //         sorter: true,
    //     },
    //     {
    //         key: 'product_to_submit ',
    //         title: 'Products to Submit',
    //         dataIndex: 'product_to_submit',
    //         sorter: true,
    //     },
    //     {
    //         key: 'submission_status ',
    //         title: 'Submission Status',
    //         dataIndex: 'city',
    //         sorter: true,
    //     },
    //     {
    //         key: 'date_of_request',
    //         title: ' Date Of Request',
    //         dataIndex: 'created_at',
    //         sorter: true,
    //         render: (created_at) => {
    //             return formatCompleteDataTime(created_at);
    //         }
    //     },
        
    // ];

    // useEffect(() => {
    //     getAllFacilities();
    //     // eslint-disable-next-line
    // }, [pagination]);

    // const getAllFacilities = () => {
    //     let payload = {
    //         start: pagination.current - 1,
    //         length: pagination.pageSize,
    //         sort_name: pagination.sortName,
    //         sort_type: pagination.sortType,
    //         filters: { "type": "facility" }
    //     };
    //     makeRequest(setLoader, getFacilities, payload, onSuccess, null);
    // }

    // const onSuccess = (response) => {
    //     setTotalRecords(response.recordsTotal);
    //     setDataSource(response.data);
    // }

    // const handleTableChange = (page, fil, sorter) => {
    //     let payload = {
    //         ...pagination,
    //         current: page.current,
    //         pageSize: page.pageSize,
    //         sortName: sorter.field || 'id',
    //         sortType: sorter.order === 'ascend' ? 'asc' : 'desc',
    //     };
    //     setPagination(payload);
    // }

    // // Create component modal
    // const onCreate = () => {
    //     setChildComponent(<CreateFacility onCreated={onCreated} type={props.type} />);
    // }
    // const onCreated = (res) => {
    //     if (res) {
    //         setDataSource([...dataSource, res]);
    //     }
    //     setChildComponent(null);
    // }


    // const onView = (record) => {
    //     setChildComponent(<ViewFacility onUpdated={onUpdated} id={record.id} />);
    // }

    // const onEdit = (record) => {
    //     setChildComponent(<EditFacility onUpdated={onUpdated} id={record.id} />);
    // }

    // const onUpdated = (res) => {
    //     if (res) {
    //         setDataSource(replaceById(dataSource, res));
    //     }
    //     setChildComponent(null);
    // }

    // const onDelete = (record) => {
    //     makeRequest(setLoader, deleteFacility, record.id, onDeleteSuccess,
    //         onError)
    // }

    // const onDeleteSuccess = (response, msg) => {
    //     setDataSource(removeById(dataSource, response.id));
    //     notify(msg.msg)
    // }

    // const onError = (error, msg) => {
    //     notify(msg.message)
    // }

    return (
        <>
           
            <BodyComponent>
                <h3>Submission</h3>
                {/* <TableComponent loader={loader} columns={columns} dataSource={dataSource} pagination={{ ...pagination, total: totalRecords }} onChange={handleTableChange} /> */}
            </BodyComponent>
        </>
    );
}

export default Submission;
