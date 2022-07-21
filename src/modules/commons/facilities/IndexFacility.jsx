import React, { useState, useEffect } from "react";
import { BodyComponent, TableComponent, ActionComponent, CreateButton,  FilterComponent
} from "@comps/components";
import { makeRequest, removeById, formatCompleteDataTime, notify, replaceById } from "@utils/helpers";
import { getFacilities, deleteFacility,getFilters } from "./requests";
import CreateFacility from "./components/CreateFacility.jsx";
import EditFacility from "./components/EditFacility.jsx";
import ViewFacility from "./components/ViewFacility.jsx";


const IndexFacility = (props) => {

    const [loader, setLoader] = useState(false);
    const [filters, setFilters] = useState({});
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
            key: 'address',
            title: 'Address',
            dataIndex: 'address',
            sorter: true,
        },
        {
            key: 'city',
            title: 'Town/City',
            dataIndex: 'city',
            sorter: true,
        },
        {
            key: 'state',
            title: 'County',
            dataIndex: 'state',
            sorter: true,
        },
        {
            key: 'country',
            title: 'Country',
            dataIndex: 'country',
            sorter: true,
        },
        {
            key: 'post_code',
            title: 'Postcode',
            dataIndex: 'post_code',
            sorter: true,
        },
        
        {
            key: "actions",
            title: 'Actions',
            render: (record) => ActionComponent({ each: record, onView: onView, onEdit: onEdit, onDelete: onDelete })
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
            {childComponent}
            <div className="da-text-right da-mt-12 da-mb-12"><CreateButton onClick={onCreate} /></div>
            <BodyComponent>
            <FilterComponent
          filters={availableFilters}
          onFilter={setFilters}
          api={getFilters}
        />
                <TableComponent loader={loader} columns={columns} dataSource={dataSource} pagination={{ ...pagination, total: totalRecords }} onChange={handleTableChange} />
            </BodyComponent>
        </>
    );
}

export default IndexFacility;
const availableFilters = [
    {
      key: "name",
      placeholder: "Name",
      type: "text",
    },
  ];
  
