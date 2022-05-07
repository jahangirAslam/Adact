import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";

import { CancelButton, SaveButton, ModalComponent } from "@comps/components";
import { makeRequest, makeRequestStateless, getErrorProps, notify } from "@utils/helpers";
import { createUser, getUserDependencies } from "../../../userManagement/users/requests";
import { createFlavour } from "./request";


const formName = "createFlavour";

const CreateUser = (props) => {

    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([]);
    const [deps, setDeps] = useState({
        roles: [],
        companies: [],
    });

    const getSelectFieldsData = () => {
        makeRequestStateless(getUserDependencies, null, onDependencySuccess, null);
    }

    useEffect(() => {
        getSelectFieldsData();
        // eslint-disable-next-line
    }, []);

    const onFinish = (data) => {
        
        let payload = { "object": data }
        payload.object.is_active = false;
        makeRequest(setLoader, createFlavour, payload, onSuccess, onError);
    }

    const onSuccess = (data, res) => {
        notify("User Created", res.msg);
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
        <ModalComponent mainTitle="Create" subTitle="Flavour" visible={true} footer={footer} onCancel={() => props.onCreated(false)}>
            <Form
                layout="vertical"
                name={formName}
                onFinish={onFinish}
            >
                <Form.Item name="name"  label="Flavour Name :" className="da-mb-16"
                    {...getErrorProps(errors['name'])}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="manufacturer_id" label="Select Manufacturer"  className="da-mb-8"
                    {...getErrorProps(errors['role_id'])}
                >
                    <Select
                        showSearch
                        placeholder="Select a user role"
                        options={deps.roles}
                    />
                </Form.Item>
                <Form.Item name="manufacturer_ref"  label="Select Manufacturer refernece" className="da-mb-16"
                    {...getErrorProps(errors['email'])}
                >
                    <Input />
                </Form.Item>


            </Form>
        </ModalComponent>
    );
}

export default CreateUser


