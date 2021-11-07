import React, { useState } from "react";
import { Form, Input } from "antd";

import { CancelComponent, SaveComponent, ModalComponent } from "@comps/components";
import { execWithLoadingState, getErrorProps, notify } from "@utils/helpers";
import { createUser } from "../requests";


const formName = "createUser";

const CreateUser = (props) => {

    const [loader, setLoader] = useState('');
    const [errors, setErrors] = useState([]);

    const onFinish = (data) => {
        let payload = { "object": data }
        execWithLoadingState(setLoader, createUser, payload, onSuccess, onError);
    }

    const onSuccess = (data, res) => {
        notify("User Created", res.msg);
        props.onCreated(true);
    }

    const onError = (err) => {
        let errors = [];
        errors['name'] = err.name;
        errors['email'] = err.email;
        errors['password'] = err.password;
        setErrors(errors);
    }

    // ------------------------------------
    // Start footer buttons array
    // ------------------------------------
    const footer = [
        <SaveComponent form={formName} key="create_button" htmlType="submit" state={loader} />,
        <CancelComponent key="close_button" onClick={() => props.onClose()} />
    ];
    // ------------------------------------
    // Eend footer buttons array
    // ------------------------------------

    return (
        <ModalComponent mainTitle="Create" subTitle="User" visible={true} footer={footer} onCancel={() => props.onCreated(false)}>
            <Form
                layout="vertical"
                name={formName}
                onFinish={onFinish}
            >
                <Form.Item name="name" rules={rules.name} label="Name :" className="da-mb-16"
                    {...getErrorProps(errors['name'])}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="email" rules={rules.email} label="Email :" className="da-mb-16"
                    {...getErrorProps(errors['email'])}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="password" rules={rules.password} label="Password :" className="da-mb-8"
                    {...getErrorProps(errors['password'])}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </ModalComponent>
    );
}

export default CreateUser

const rules = {
    name: [
        { required: true, message: 'Please input your password!', },
        { min: 3, message: 'Minimum password length is 3', },
        { max: 100, message: 'Maximum password length is 100', },
    ],
    email: [
        { type: "email", message: "The input is not valid email!" },
        { required: true, message: "Please input your email!" },
    ],
    password: [
        { required: true, message: 'Please input your password!', },
        { min: 6, message: 'Minimum password length is 6', },
        { max: 30, message: 'Maximum password length is 30', },
    ],
};
