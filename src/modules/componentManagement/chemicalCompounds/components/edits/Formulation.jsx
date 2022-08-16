import { ActionComponent, BodyComponent, CreateButton, EditAbleTable } from "@comps/components";
import { makeRequest, notify, removeById, replaceById } from "@utils/helpers";
import { Form } from "antd";
import React, { useEffect, useState } from "react";
import EditFacility from "../../../../commons/facilities/components/EditFacility";
import ViewFacility from "../../../../commons/facilities/components/ViewFacility";
import { deleteFormulation, getFormulation, getFormulations, updateSubstance } from "./components/request";
import CreateFormulation from "./CreateFormulation";
const Formulation = (props) => {
    var delItems = []
    const [form] = Form.useForm();
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
            // const newData = [...data];
            let payload = {
                id: id,
                flavour_id: props.flavourId,
                percentage: row.percentage,

            }
            makeRequest(setLoader, updateSubstance, payload, onError);
            setEditingKey('');
            getFormulation();
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };


    const columns = [
        {
            key: 'chemical_substance ',
            title: 'Chemical Substance ',
            dataIndex: 'chemical_substance',
            sorter: true,
            editable: false,
        },
        {
            key: ' cas_number',
            title: 'CAS Number ',
            dataIndex: 'cas_number',
            sorter: true,
            editable: false,
        },
        {
            key: 'type ',
            title: 'Type ',
            dataIndex: 'type',
            sorter: true,
            editable: false,
        },
        {
            key: 'percentage ',
            title: 'Percentage ',
            dataIndex: 'percentage',
            sorter: true,
            editable: true,
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
              ActionComponent({ each: record,  onDelete: onDelete }),
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
            
        };
        makeRequest(setLoader, getFormulations, payload, onSuccess, null);
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
    const rowSelection = {
        onChange: (selectedRowKeys) => {
            delItems=[]
             delItems=selectedRowKeys
        },
    };

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
        makeRequest(setLoader, deleteFormulation, record.id, onDeleteSuccess,
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
            <EditAbleTable loader={loader} columns={columns} dataSource={dataSource} pagination={{ ...pagination, total: totalRecords }} onChange={handleTableChange} isEditAble={true} isEditing={isEditing} form={form} cancel={cancel}  rowSelection={rowSelection} />
            </BodyComponent>
        </>
    );
}

export default Formulation;
