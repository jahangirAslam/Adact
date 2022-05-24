import { CancelButton, ModalComponent, SaveButton } from "@comps/components";
import { getErrorProps, makeRequest, notify } from "@utils/helpers";
import { Form, Input, Select } from "antd";
import React, { useState } from "react";
import { createFlavour } from "./request";



const formName = "createFlavour";

const CreateFlavour = (props) => {

    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([]);
    const [deps, setDeps] = useState({
        roles: [],
        companies: [],
    });

    // const getSelectFieldsData = () => {
    //     makeRequestStateless( null, onDependencySuccess, null);
    // }

    // useEffect(() => {
    //     getSelectFieldsData();
    //     // eslint-disable-next-line
    // }, []);

    const onFinish = (data) => {

        let payload = { "object": data }
        payload.object.is_active = false;
        makeRequest(setLoader, createFlavour, payload, onSuccess, onError);
    }

    const onSuccess = (data, res) => {
        notify("Flavour Created", res.msg);
        props.onCreated(data);
    }

    const onDependencySuccess = (data, res) => {
        setDeps({
            roles: data.roles,
            companies: data.companies
        });
    }

    const onError = (err) => {
        let errorList = [];
        errorList['name'] = err.name;
        errorList['email'] = err.email;
        errorList['role_id'] = err.role_id;
        errorList['company_id'] = err.company_id;
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
        <ModalComponent mainTitle="Create" subTitle="Component" visible={true} footer={footer} onCancel={() => props.onCreated(false)}>
            <Form
                layout="vertical"
                name={formName}
                onFinish={onFinish}
            >
                <Form.Item name="type" label="Component Type" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select Type"
                        options={deps.types}
                    />
                </Form.Item>

                <Form.Item name="type_name" label="Add Substance :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select Substance"
                        options={deps.substances}
                    />
                </Form.Item>
                <Form.Item name="name" rules={rules.name} label="Add Substance Name" placeholder="Substance Name" className="da-mb-16"
                    {...getErrorProps(errors['name'])}>
                    <Input />
                </Form.Item>
                <Form.Item name="cas_number" rules={rules.name} label="Add CAS Number" placeholder="CAS Number" className="da-mb-16"
                    {...getErrorProps(errors['name'])}>
                    <Input />
                </Form.Item>
                <Form.Item name="type_name" label="Add Substance :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select Substance"
                        options={deps.substances}
                    />
                </Form.Item>


            </Form>
        </ModalComponent>
    );
}

export default CreateRecipe

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




