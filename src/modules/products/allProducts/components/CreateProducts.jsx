import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { CancelButton, SaveButton, ModalComponent } from "@comps/components";
import { makeRequest, getErrorProps, notify, makeRequestStateless } from "@utils/helpers";
import { createProduct, getProductDependencies } from "./request";

const formName = "createProduct";
const CreateProduct = (props) => {

    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([]);
    const [deps, setDeps] = useState({
        countries: [],
        types: [],
        customers: [],
        typeB:[]
        
    });
   

    const onFinish = (data) => {
        let load = {
            customer_id: 1,
            name: data.name,
            type_id: 1,
            category_id: 2
        }
        let payload = { "object": load }
        payload.object["type"] = "product";
        makeRequest(setLoader, createProduct, payload, onSuccess, onError);
    }

    const onSuccess = (data, res) => {
        notify("Product Created", res.msg);
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
            countries: data.countries,
            types: data.product_types,
            customers: data.customers,
            typeB:data.e_types,

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
        <ModalComponent mainTitle="Create" subTitle="Product" visible={true} footer={footer} onCancel={() => props.onCreated(false)}>
            <Form
                layout="vertical"
                name={formName}
                onFinish={onFinish}
            >
                <Form.Item name="name" rules={rules.country} label="Customer Name :" className="da-mb-16"
                    {...getErrorProps(errors['country'])}>
                    <Select
                        showSearch
                        placeholder="Customer Name"
                        options={deps.customers}
                    />
                </Form.Item>

                <Form.Item name="type_name" rules={rules.country} label="Product Type :" className="da-mb-16"
                    {...getErrorProps(errors['country'])}>
                    <Select
                        showSearch
                        placeholder="Product Type"
                        options={deps.types}
                    />
                </Form.Item>
                <Form.Item name="e_type" rules={rules.country} label="Product Type :" className="da-mb-16"
                    {...getErrorProps(errors['country'])}>
                    <Select
                        showSearch
                        placeholder="Product Type"
                        options={deps.typeB}
                    />
                </Form.Item>

                <Form.Item name="name" rules={rules.name} label="Product Name" placeholder="Product Name" className="da-mb-16"
                    {...getErrorProps(errors['name'])}>
                    <Input />
                </Form.Item>


            </Form>
        </ModalComponent>
    );
}

export default CreateProduct

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
