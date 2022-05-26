import { ActionComponent, CreateButton, EditAbleTable } from "@comps/components";
import { makeRequest, notify, removeById } from "@utils/helpers";
import { Form, Popconfirm, Row, Typography } from "antd";
import { default as React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CreateRecipe from "./CreateRecipe";
import { deleteFlavour, getFlavours, updateSubstance } from "./request";
const originData = [];


const Recipe = (props) => {
    const history = useHistory();
    const [loader, setLoader] = useState(false);
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [data, setData] = useState(originData);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        sortName: 'id',
        sortType: 'desc'
    });

    const [childComponent, setChildComponent] = useState(null);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record && record.id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.id);

    };

    const cancel = () => {
        setEditingKey('');
    };
    const save = async (id) => {

        try {
            const row = await form.validateFields();
            const newData = [...data];
            let payload = {
                id: id,
                flavour_id: props.flavourId,
                percentage: row.percentage,

            }
            makeRequest(setLoader, updateSubstance, payload, onError);
            setEditingKey('');
            getAllFlavours();
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            editable: false,
        },
        {
            title: 'type',
            dataIndex: 'type',
            width: '15%',
            editable: false,
        },
        {
            title: 'RAF',
            dataIndex: 'raf',
            width: '15%',
            editable: false,
        },
        {
            title: 'Percentage',
            dataIndex: 'percentage',
            width: '25%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.id)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <ActionComponent each={record} onEdit={edit} onDelete={onDelete} >
                    </ActionComponent>
                );
            },
        },
    ];


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
        setChildComponent(<CreateRecipe onCreated={onCreated} product_id={props.flavourId} />);
    }

    const onCreated = (each) => {
        if (!each) {
            setChildComponent(null);
        }
        getAllFlavours();
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

            <EditAbleTable loader={loader} columns={columns} dataSource={dataSource} pagination={{ ...pagination, total: totalRecords }} onChange={handleTableChange} isEditAble={true} isEditing={isEditing} form={form} cancel={cancel} />
        </>
    );
}

export default Recipe;


