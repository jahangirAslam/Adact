import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { ActionComponent, CreateButton, EditAbleTable } from "@comps/components";
import { makeRequest, notify, removeById } from "@utils/helpers";
import { Popconfirm, Row, Typography ,Form } from "antd";
import { default as React,  useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CreateRecipe from "./CreateRecipe";
import { deleteFlavour, getFlavours } from "./request";
const originData = [];


const Recipe = () => {

    const history = useHistory();
    const [loader, setLoader] = useState(false);
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [flavourRecord, setFlavourRecord] = useState(undefined)
    const [data, setData] = useState(originData);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        sortName: 'id',
        sortType: 'desc'
    });

    const [childComponent, setChildComponent] = useState(null);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.id);

    };

    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
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
            title: 'cas_number',
            dataIndex: 'cas_number',
            width: '40%',
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
                            onClick={() => save(record.key)}
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

            <EditAbleTable loader={loader} columns={columns} dataSource={dataSource} pagination={{ ...pagination, total: totalRecords }} onChange={handleTableChange} isEditAble={true} isEditing={isEditing} form={form} cancel={cancel}  />
        </>
    );
}

export default Recipe;


