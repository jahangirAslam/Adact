import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { ActionComponent, BodyComponent, CreateButton, FilterComponent, SelectionTable } from "@comps/components";
import { makeRequest, notify, removeById } from "@utils/helpers";
import { Col, Row, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CreateRecipe from "./CreateTest";
import { deleteFlavour, getFilters, getFlavours } from "./request";
import { InputNumber, Space } from 'antd';
import TextArea from "antd/lib/input/TextArea";

const onChange = (value) => {
  console.log('changed', value);
};
const Design = (props) => {
    var delItems = []
    const history = useHistory();
    const [loader, setLoader] = useState(false);
    const [filters, setFilters] = useState({});
    const [dataSource, setDataSource] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        sortName: 'id',
        sortType: 'desc'
    });

    const [childComponent, setChildComponent] = useState(null);
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
            <ActionComponent each={record} onDelete={onDelete} onEdit={onEdit} onView={onView} >
            </ActionComponent>
        );
    }

    useEffect(() => {
        getAllFlavours();
        // eslint-disable-next-line
    }, [pagination, filters]);


    const getAllFlavours = () => {
        let payload = {
            start: pagination.current - 1,
            length: pagination.pageSize,
            sort_name: pagination.sortName,
            sort_type: pagination.sortType,
            filters

        };
        makeRequest(setLoader, getFlavours, payload, onSuccess, null);
    }



    const onSuccess = (response) => {
        setTotalRecords(response.recordsTotal);
        setDataSource(response.data);
    }

    


    //deleted multi Items
    const rowSelection = {
        onChange: (selectedRowKeys) => {
            delItems = []
            delItems = selectedRowKeys
        },
    };
    // Create component modal
    const onCreate = () => {
        setChildComponent(<CreateRecipe onCreated={onCreated} product_id={props.product_id} />);
    }

    const onCreated = (res) => {
        if(res){
            history.push(`/products/product-test/edit/${res.data.object.id}`);
        }
        setChildComponent(null);
    }

    const onEdit = (record) => {
        history.push(`/products/product-test/edit/${record.id}`);
    }
    const onView = (record) => {
        history.push(`/products/product-test/view/${record.id}`);

    }
    const onDelete = (record) => {
        let index = delItems.findIndex(o => o === record.id);
        if (index === -1) {
            delItems.push(record.id)
        }
        const payload = { "ids": delItems };
        makeRequest(setLoader, deleteFlavour, payload, onDeleteSuccess, onError)
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
    const onDeleteSuccess = (response, msg) => {
        getAllFlavours();
        notify(msg.msg)
    }

    const onError = (error, msg) => {
        //
    }

    return (
        < >
            {childComponent}
            <Row justify="space-between" className="da-pb-24" >
                <Col className="inner-form-heading" >
                    <h4>Product Design</h4>
                </Col>
                <CreateButton onClick={onCreate} />
            </Row>
            <BodyComponent>            
            <Row justify="space-between" gutter={[16, 24]} >
            <Col className="gutter-row discription" span={11} >
                <h5 className="headerHeadings">Product Description</h5>
            <TextArea rows={100} placeholder="Discription" maxLength={1000} />
            </Col>
                <Col className="gutter-row" span={11} >
                <h5 className="headerHeadings">Product Dimensions</h5>
                <div>
            <InputNumber className="dimensions" size="large" min={1} placeholder="Length mm" max={100000} defaultValue={3} onChange={onChange} />
            <InputNumber className="dimensions" size="large" min={1} placeholder="Width mm" max={100000} defaultValue={3} onChange={onChange} />
            <InputNumber className="dimensions" size="large" min={1} placeholder="Height mm" max={100000} defaultValue={3} onChange={onChange} />
            </div> 
                </Col>

                <Col className="gutter-row discription" span={11} >
            </Col>

                <Col className="gutter-row" span={11} >
                <h5 className="headerHeadings">E-Liquid</h5>
                <h5 className="headerHeadings">Liquid volume capacity Nicotine</h5>
                <div>
            <InputNumber className="dimensions" size="large" min={1} placeholder="" max={100000} defaultValue={3} onChange={onChange} />
            <InputNumber className="dimensions" size="large" min={1} placeholder="" max={100000} defaultValue={3} onChange={onChange} />
            </div> 
                </Col>
                
            </Row>
            <Row justify="space-between" className="da-pb-24" >
                <Col className="inner-form-heading" >
                    <h5>Electric Product </h5>
                </Col>
            </Row>


                <FilterComponent filters={availableFilters} onFilter={setFilters} api={getFilters} />
                {/* <SelectionTable loader={loader} columns={columns} dataSource={dataSource} pagination={{ ...pagination, total: totalRecords }} rowSelection={rowSelection} onChange={handleTableChange} /> */}
            </BodyComponent>
        </>
    );
}

export default Design;

const availableFilters = [

    {
        key: 'laboratory_name',
        placeholder: ' Battery Type ',
        type: 'select',
        data_key: 'laboratory'
    },
    {
        key: 'customer_name',
        placeholder: 'Battery Capacity',
        type: 'select',
        data_key: 'customers'
    },
    {
        key: 'product_name',
        placeholder: 'Volt Watt adjustable',
        type: 'select',
        data_key: 'product_name'
    },
    {
        key: 'test_ref',
        placeholder: 'e-cig device ID',
        type: 'text',
    },
    {
        key: 'type',
        placeholder: 'Voltage',
        type: 'select',
        data_key: 'types'
    },
    {
        key: 'status',
        placeholder: 'Voltage Upper Range',
        type: 'select',
        data_key: 'status'
    },
    {
        key: 'current',
        placeholder: 'Voltage lower Range',
        type: 'select',
        data_key: 'current'
    },
    {
        key: 'current',
        placeholder: 'Coil Resistance',
        type: 'select',
        data_key: 'current'
    },
    {
        key: 'current',
        placeholder: 'Wattage',
        type: 'select',
        data_key: 'current'
    },
    {
        key: 'status',
        placeholder: 'Voltage Upper Range',
        type: 'select',
        data_key: 'status'
    },
    {
        key: 'current',
        placeholder: 'Voltage lower Range',
        type: 'select',
        data_key: 'current'
    },
    {
        key: 'current',
        placeholder: 'Coil Composition',
        type: 'select',
        data_key: 'current'
    },


];
