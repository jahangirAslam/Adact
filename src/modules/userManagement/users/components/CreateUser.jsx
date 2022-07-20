import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";

import { CancelButton, SaveButton, ModalComponent } from "@comps/components";
import { makeRequest, makeRequestStateless, getErrorProps, notify } from "@utils/helpers";
import { createUser, getUserDependencies } from "../requests";


const formName = "createUser";

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
    makeRequest(setLoader, createUser, payload, onSuccess, onError);
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
    // <CancelButton key="close_button" onClick={() => props.onCreated(false)} />
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
        <Form.Item name="first_name" rules={rules.name} label=" First Name :" className="da-mb-16"
          {...getErrorProps(errors['name'])}
        >
          <Input />
        </Form.Item>
        <Form.Item name="last_name" rules={rules.name} label="Last Name :" className="da-mb-16"
          {...getErrorProps(errors['name'])}
        >
          <Input />
        </Form.Item>

        <Form.Item name="email" rules={rules.email} label="Email :" className="da-mb-16"
          {...getErrorProps(errors['email'])}
        >
          <Input />
        </Form.Item>

        <Form.Item name="role_id" label="Select Role :" rules={rules.role_id} className="da-mb-8"
          {...getErrorProps(errors['role_id'])}
        >
          <Select
            showSearch
            placeholder="Select a user role"
            options={deps.roles}
          />
        </Form.Item>

        <Form.Item name="company_id" label="Select Third Party :" rules={rules.company_id} className="da-mb-8"
          {...getErrorProps(errors['company_id'])}
        >
          <Select
            showSearch
            placeholder="Select a user third party"
            options={deps.companies}
          />
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
  role_id: [
    { required: true, message: 'Please select user role!', },
  ],
  company_id: [
    { required: true, message: 'Please select user third party!', },
  ],
};
