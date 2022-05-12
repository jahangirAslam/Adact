import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Row, Tag } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { HeaderComponent, BodyComponent, TableComponent, ActionComponent, CreateButton, FilterComponent, ImportButton } from "@comps/components";
import { makeRequest, formatCompleteDataTime, notify, removeById, replaceById } from "@utils/helpers";
import CreateFlavour from "../../../components/CreateFlavour";
import { deleteFlavour, getFilters, getFlavours } from "../../../components/request";

const pageConfig = {
    headers: {
        title: "Flavour",
        breadcrumb: [
            {
                name: "Flavour",
                // path: "/flavours"
            }
        ]
    }
}

const Recipe = () => {

    const history = useHistory();
    const [loader, setLoader] = useState(false);

    const [dataSource, setDataSource] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
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
            key: 'manufacturer_id',
            title: 'Manufacturer name',
            dataIndex: 'manufacturer_id',
            sorter: false,
        },
        {
            key: 'manufacturer_ref',
            title: 'Ref.(Manufacturer)',
            dataIndex: 'manufacturer_ref',
            sorter: false,
        },
        {
            key: 'fed_uuin',
            title: 'FED UUIN',
            dataIndex: 'fed_uuin',
            sorter: false,
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
                {/* <Button className="da-px-10 da-my-0" type="link" size="middle" onClick={() => activateDeactiveUser(record)}>{icon}</Button> */}
            </ActionComponent>
        );
    }

    useEffect(() => {
        getAllFlavours();
        // eslint-disable-next-line
    }, [pagination]);

    const getAllFlavours = () => {
        let payload = {
            start: pagination.current - 1,
            length: pagination.pageSize,
            sort_name: pagination.sortName,
            sort_type: pagination.sortType,

        };
        makeRequest(setLoader, getFlavours, payload, onSuccess, null);
    }



    const onSuccess = (response) => {
        setTotalRecords(response.recordsTotal);
        setDataSource(response.data);
    }

    const onImported = (res) => {
        getAllFlavours();
        setChildComponent(null);
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
        setChildComponent(<CreateFlavour onCreated={onCreated} />);
    }

    const onCreated = (each) => {
        if (!each) {
            setChildComponent(null);
        }
        setDataSource([...dataSource, each.object]);
    }



    const onView = (record) => {

        history.push(`/component-management/users/view/${record.id}`);
    }

    const onEdit = (record) => {
        history.push(`/component-management/users/edit/${record.id}`);
    }

    const onDelete = (record) => {
        makeRequest(setLoader, deleteFlavour, record.id, onDeleteSuccess,
            onError)
    }

    const onDeleteSuccess = (response, msg) => {
        setDataSource(removeById(dataSource, response.id));
        notify(msg.msg)
    }

    const onError = (error, msg) => {
        //
    }

    return (
        < >
            {childComponent}
            <Row  justify="end" className="da-pb-24" >

            <CreateButton onClick={onCreate} />
            </Row>

            <TableComponent loader={loader} columns={columns} dataSource={dataSource} pagination={{ ...pagination, total: totalRecords }} onChange={handleTableChange} />
        </>
    );
}

export default Recipe;


