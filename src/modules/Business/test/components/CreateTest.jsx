import React, { useEffect, useState } from "react";
import { CancelButton, ModalComponent, SaveButton } from "@comps/components";
import { getErrorProps, makeRequest, makeRequestStateless, notify } from "@utils/helpers";
import { Form, Input, Select } from "antd";
import { createProduct, getProductDependencies } from "./request";


const formName = "createTest";
const CreateTest = (props) => {

    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([]);
    const [deps, setDeps] = useState({
        laboratory: [],
        facility: [],
        types: [],
        typeB: []

    });


    const onFinish = (data) => {
        let load = {
            customer_id: 1,
            product_id: 48,
            laboratory_id: 1,
            facility_id: 1,
            type: data.type,
            batch_ref: null,
            test_ref:data.test_ref,
            created_by:1,
            status:data.status,
            tested_date:"2022-05-03",
        }
        let payload = { "object": load }
        payload.object["type"] = "labTest";
        makeRequest(setLoader, createProduct, payload, onSuccess, onError);
    }

    const onSuccess = (data, res) => {
        notify("Test Created", res.msg);
        props.onCreated(data.object);
    }

    const getSelectFieldsData = () => {
        makeRequestStateless(getProductDependencies, null, onDependencySuccess, null);
    }

    useEffect(() => {
        getSelectFieldsData();
        // eslint-disable-next-line
    }, []);

    const onDependencySuccess = (data, res) => {
        setDeps({
            laboratory: data.laboratory,
            facility: data.facility,
            types: data.types,
            typeB: data.e_types,

        });


    }

    const onError = (err) => {
        let errorList = [];
        errorList['name'] = err.name;
        setErrors(errorList);
    }

    // ------------------------------------
    // Start footer buttons array
    // ------------------------------------
    const footer = [
        <SaveButton form={formName} key="create_button" htmlType="submit" state={loader} />,
        <CancelButton key="close_button" onClick={() => props.onCreated(false)} />
    ];
    // ------------------------------------
    // Eend footer buttons array
    // ------------------------------------

    return (
        <ModalComponent mainTitle="Create" subTitle="Lab Test" visible={true} footer={footer} onCancel={() => props.onCreated(false)}>
            <Form
                layout="vertical"
                name={formName}
                onFinish={onFinish}
            >
                <Form.Item name="type" label="Select Type :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Type"
                        options={deps.types}
                    />
                </Form.Item>

                <Form.Item name="test_ref" label="Test_Ref :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Test Ref"
                        options={deps.types}
                    />
                </Form.Item>
         
                <Form.Item name="status" rules={rules.name} label="Status" placeholder="Status" className="da-mb-16"
                    {...getErrorProps(errors['name'])}>
                    <Input />
                </Form.Item>


            </Form>
        </ModalComponent>
    );
}

export default CreateTest

const rules = {
    name: [
        { required: true, message: 'Please input your name!', },
        { min: 3, message: 'Minimum name length is 3', },
        { max: 100, message: 'Maximum name length is 100', },
    ],
    email: [
        { type: "email", message: "The input is not valid email!" },
        { required: true, message: "Please input your email!" },
    ],
    country: [
        { required: true, message: 'Please select country!', },
    ],
};
