import React, { useState, useEffect } from "react";
import { BodyComponent, TableComponent, ActionComponent, CreateButton,FilterComponent } from "@comps/components";
import { makeRequest, removeById, formatCompleteDataTime, notify, replaceById } from "@utils/helpers";
import { getLocations, deleteLocation,getFilters } from "./requests";
import CreateLocation from "./components/CreateLocation.jsx";
import EditLocation from "./components/EditLocation.jsx";
import ViewLocation from "./components/ViewLocation.jsx";


const IndexLocation = (props) => {

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
            key: 'first_address',
            title: 'Adress',
            dataIndex: 'first_address',
            sorter: true,
        },
        
        {
            key: 'city',
            title: 'Town/City',
            dataIndex: 'city',
            sorter: true,
        },
        {
            key: 'country_id',
            title: 'Country',
            dataIndex: 'country_id',
            sorter: true,
        },
        {
            key: 'zipcode',
            title: 'Post Code',
            dataIndex: 'zipcode',
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
            render: (record) => ActionComponent({ each: record, onView: onView, onEdit: onEdit, onDelete: onDelete })
        },
    ];

    useEffect(() => {
        getAllLocations();
        // eslint-disable-next-line
    }, [pagination, filters]);

    const getAllLocations = () => {
        let payload = {
            start: pagination.current - 1,
            length: pagination.pageSize,
            sort_name: pagination.sortName,
            sort_type: pagination.sortType,
            filters: { "type": props.type }
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
        setChildComponent(<CreateLocation onCreated={onCreated} type={props.type} />);
    }
    const onCreated = (res) => {
        if (res) {
            setDataSource([...dataSource, res]);
        }
        setChildComponent(null);
    }


    const onView = (record) => {
        setChildComponent(<ViewLocation onUpdated={onUpdated} id={record.id} />);
    }

    const onEdit = (record) => {
        setChildComponent(<EditLocation onUpdated={onUpdated} id={record.id} />);
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
            {childComponent}
            <div className="da-text-right da-mt-12 da-mb-12"><CreateButton onClick={onCreate} /></div>
            <BodyComponent>
            <FilterComponent filters={ availableFilters } onFilter={ setFilters } api={ getFilters } />
                <TableComponent loader={loader} columns={columns} dataSource={dataSource} pagination={{ ...pagination, total: totalRecords }} onChange={handleTableChange} />
            </BodyComponent>
        </>
    );
}

export default IndexLocation;

const availableFilters = [
    {
      key: 'name',
      placeholder: 'Name',
      type: 'select',
    },
    // {
    //     key: 'name',
    //     placeholder: 'Country ',
    //     type: 'select',
    //   },
    //   {
    //     key: 'name',
    //     placeholder: 'Email ',
    //     type: 'select',
    //   },
    //   {
    //     key: 'name',
    //     placeholder: 'Status ',
    //     type: 'select',
    //   },
  ];
