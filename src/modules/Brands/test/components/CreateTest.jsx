import { CancelButton, ModalComponent, SaveButton } from "@comps/components";
import { makeRequest, makeRequestStateless, notify } from "@utils/helpers";
import { Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createItem, getDependencies } from "./request";


const formName = "createTest";
const CreateTest = (props) => {

    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([]);
    const [deps, setDeps] = useState({
        countries: [],
        customer: [],
        agent: [],
        product: []

    });

    const { id } = useParams()
    const onFinish = (data) => {
        
        const load = {
            selectedCountries: [data.country_id],
            ...data
        }
        let payload = { "object": load }
        makeRequest(setLoader, createItem, payload, onSuccess, onError);
    }

    const onSuccess = (data, res) => {
        notify("Test Created", res.msg);
        props.onCreated(res);
    }

    const getSelectFieldsData = () => {

        makeRequestStateless(getDependencies, null, onDependencySuccess, null);
    }

    useEffect(() => {
        getSelectFieldsData();
        // eslint-disable-next-line
    }, []);

    const onDependencySuccess = (data, res) => {

        setDeps({
            countries: data.countries,
            customer: data.customer,
            agent: data.agent,
            product: data.product,


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
    ];
    // ------------------------------------
    // Eend footer buttons array
    // ------------------------------------

    return (
        <ModalComponent mainTitle="ADD A BRANDS" visible={true} footer={footer} onCancel={() => props.onCreated(false)}>
            <Form
                layout="vertical"
                name={formName}
                onFinish={onFinish}
            >
                <Form.Item name="customer_id" label="Customer :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Test Ref"
                        options={deps.customer}
                    />
                </Form.Item>
                <Form.Item name="product_id" label="Product :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Test Ref"
                        options={deps.product}
                    />
                </Form.Item>
                <Form.Item name="name" label="Brand Name :" className="da-mb-16"
                >
                    <Input />
                </Form.Item>
                <Form.Item name="sub_name" label="Sub-Brand Name :" className="da-mb-16"
                >
                    <Input />
                </Form.Item>
                <Form.Item name="country_id" label="Market :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Test Ref"
                        options={deps.countries}
                    />
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
