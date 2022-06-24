import { CancelButton, ModalComponent, SaveButton } from "@comps/components";
import { makeRequest, makeRequestStateless, notify } from "@utils/helpers";
import { Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { createItem, getDependencies } from "../components/request";


const formName = "create";
const Create = (props) => {

    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([]);
    const [deps, setDeps] = useState({
        countries: [],

    });


    const onFinish = (data) => {
        let load = {
            customer_id: 2,
            submitted_by: 1,
            product_id: null,
            submitted_at: "2022-05-24 00:00:00",
            submitted_products: 5,
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
        <ModalComponent mainTitle="Create" subTitle="Submission" visible={true} footer={footer} onCancel={() => props.onCreated(false)}>
            <Form
                layout="vertical"
                name={formName}
                onFinish={onFinish}
            >
                <Form.Item name="type" label="Type :" className="da-mb-16"
                >
                    <Input />
                </Form.Item>
               
                <Form.Item name="submission_status" label="Submission status :" className="da-mb-16"
                >
                    <Input />
                </Form.Item>
                
                <Form.Item name="message" label="Message :" className="da-mb-16"
                >
                    <Input />
                </Form.Item>
                <Form.Item name="submission_size" label="Submission Size :" className="da-mb-16"
                >
                    <Input />
                </Form.Item>
                <Form.Item name="submission_type" label="Submission Type :" className="da-mb-16"
                >
                    <Input />
                </Form.Item>
                <Form.Item name="submission_target" label="Submission target :" className="da-mb-16"
                >
                    <Input />
                </Form.Item>



            </Form>
        </ModalComponent>
    );
}

export default Create

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
