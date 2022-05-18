import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { ActionComponent, CreateButton, EditAbleTable } from "@comps/components";
import { makeRequest, notify, removeById } from "@utils/helpers";
import { Row } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CreateRecipe from "./CreateRecipe";
import { deleteFlavour, getFlavours } from "./request";



const Recipe = () => {

    const history = useHistory();
    const [loader, setLoader] = useState(false);

    const [dataSource, setDataSource] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [flavourRecord, setFlavourRecord] = useState(undefined)
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
            key: 'type',
            title: 'Type',
            dataIndex: 'type',
            sorter: false,
        },
        {
            key: 'cas_number',
            title: 'Cas Number',
            dataIndex: 'cas_number',
            sorter: false,
        },
        {
            key: "actions",
            title: 'Actions',
            render: (record) => ActionComponentEx(record)
        },
    ];

    const ActionComponentEx = (record) => {
        setFlavourRecord(record);
        let icon = null;
        if (record) {
            if (record.is_active) {
                icon = <CloseOutlined className="icon-style da-text-color-danger-1" />;
            } else {
                icon = <CheckOutlined className="icon-style da-text-color-success-1" />;
            }
        }
        return (
            <ActionComponent each={record} onEdit={onEdit} onDelete={onDelete}>
            </ActionComponent>
        );
    }

    useEffect(() => {
        getAllFlavours();
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
        setChildComponent(<CreateRecipe onCreated={onCreated} flavourRecord={flavourRecord} />);
    }

    const onCreated = (each) => {
        if (!each) {
            setChildComponent(null);
        }
        setDataSource([...dataSource, each.object]);
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
            <Row justify="end" className="da-pb-24" >
                <CreateButton onClick={onCreate} />
            </Row>

            <EditAbleTable loader={loader} columns={columns} dataSource={dataSource} pagination={{ ...pagination, total: totalRecords }} onChange={handleTableChange} isEditAble={true} />
        </>
    );
}

export default Recipe;


