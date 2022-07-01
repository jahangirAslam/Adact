import React, { useEffect, useState } from "react";
import { CancelButton, ModalComponent, SaveButton } from "@comps/components";
import { getErrorProps, makeRequest, makeRequestStateless, notify } from "@utils/helpers";
import { Form, Input, Select } from "antd";
import { createProduct, getProductDependencies } from "./request";


const formName = "createFlavour";
const CreateProduct = (props) => {

    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([]);
    const [deps, setDeps] = useState({
        product_categories: [],
        types: [],
        customers: [],
        typeB: []

    });


    const onFinish = (data) => {
        let payload = { "object": data }
        makeRequest(setLoader, createProduct, payload, onSuccess, onError);

    }

    const onSuccess = (data, res) => {
        notify("Flavour Created", res.msg);
        props.onCreated(res);
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
            product_categories: data.product_categories,
            types: data.product_types,
            customers: data.customers,
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
        // <CancelButton key="close_button" onClick={() => props.onCreated(false)} />
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
                <Form.Item name="customer_id" label="Customer Name :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Customer Name"
                        options={deps.customers}
                    />
                </Form.Item>

                <Form.Item name="category_id" label="Product category :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Product category"
                        options={deps.product_categories}
                    />
                </Form.Item>
                <Form.Item name="type_id" label="Product type :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Product type   "
                        options={deps.types}
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
