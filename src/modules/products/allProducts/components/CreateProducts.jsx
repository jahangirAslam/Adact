import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { CancelButton, SaveButton, ModalComponent } from "@comps/components";
import { makeRequest, getErrorProps, notify, makeRequestStateless } from "@utils/helpers";
import { createCustomer } from "../../../thirdPartyManagement/customers/requests";
import { getLocationDependencies } from "@mods/commons/locations/requests";

const formName = "createProduct";
const CreateProduct = (props) => {

    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([]);
    const [deps, setDeps] = useState({
        countries: []
    });

    const onFinish = (data) => {
        let payload = { "object": data }
        payload.object["type"] = "customers";
        makeRequest(setLoader, createCustomer, payload, onSuccess, onError);
    }

    const onSuccess = (data, res) => {
        notify("Customer Created", res.msg);
        props.onCreated(data.object);
    }

    const getSelectFieldsData = () => {
        makeRequestStateless(getLocationDependencies, null, onDependencySuccess, null);
    }

    useEffect(() => {
        getSelectFieldsData();
        // eslint-disable-next-line
    }, []);

    const onDependencySuccess = (data, res) => {
        setDeps({
            countries: data.countries,
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
                <Form.Item name="country_id" rules={rules.country} label="Select customer :" className="da-mb-16"
                    {...getErrorProps(errors['country'])}>
                    <Select
                        showSearch
                        placeholder="Select customer"
                        options={deps.countries}
                    />
                </Form.Item>
                <Form.Item name="country_id" rules={rules.country} label="Product Type :" className="da-mb-16"
                    {...getErrorProps(errors['country'])}>
                    <Select
                        showSearch
                        placeholder="Product Type"
                        options={deps.countries}
                    />
                </Form.Item>
                <Form.Item name="country_id" rules={rules.country} label="Product Type :" className="da-mb-16"
                    {...getErrorProps(errors['country'])}>
                    <Select
                        showSearch
                        placeholder="Product Type"
                        options={deps.countries}
                    />
                </Form.Item>
                <Form.Item name="email" rules={rules.email} label="Product Name" placeholder="Product Name" className="da-mb-16"
                    {...getErrorProps(errors['email'])}>
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
