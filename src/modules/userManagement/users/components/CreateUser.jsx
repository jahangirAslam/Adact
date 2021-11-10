import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";

import { CancelComponent, SaveComponent, ModalComponent } from "@comps/components";
import { execWithLoadingState, getErrorProps, notify } from "@utils/helpers";
import { createUser, getUserDependencies } from "../requests";


const formName = "createUser";

const CreateUser = (props) => {

  const [loader, setLoader] = useState('');
  const [errors, setErrors] = useState([]);
  const [rolesOptions, setRolesOptions] = useState([]);
  const [companiesOptions, setCompaniesOptions] = useState([]);

  const getSelectFieldsData = () => {
      execWithLoadingState(setLoader, getUserDependencies, null, onDependencySuccess, null);
  }

  useEffect(() => {
    getSelectFieldsData();
    // eslint-disable-next-line
  }, []);

  const onFinish = (data) => {
    let payload = { "object": data }
    execWithLoadingState(setLoader, createUser, payload, onSuccess, onError);
  }

  const onSuccess = (data, res) => {
    notify("User Created", res.msg);
    props.onCreated(true);
  }

  const onDependencySuccess = (data, res) => {
    setRolesOptions(data.roles);
    setCompaniesOptions(data.companies);
  }

  const onError = (err) => {
    let errors = [];
    errors['name'] = err.name;
    errors['email'] = err.email;
    errors['role_id'] = err.role_id;
    errors['company_id'] = err.company_id;
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
    <ModalComponent mainTitle="Create" subTitle="User" visible={true} footer={footer}
                    onCancel={() => props.onCreated(false)}>
      <Form
        layout="vertical"
        name={formName}
        onFinish={onFinish}
      >
        <Form.Item name="name" rules={rules.name} label="Name :" className="da-mb-16"
                   {...getErrorProps(errors['name'])}
        >
          <Input/>
        </Form.Item>

        <Form.Item name="email" rules={rules.email} label="Email :" className="da-mb-16"
                   {...getErrorProps(errors['email'])}
        >
          <Input/>
        </Form.Item>

        <Form.Item name="role_id" label="Select Role :" rules={rules.role_id} className="da-mb-8"
                   {...getErrorProps(errors['role_id'])}
        >
          <Select
            showSearch
            placeholder="Select a user role"
            options={rolesOptions}
          />
        </Form.Item>

        <Form.Item name="company_id" label="Select Third Party :" rules={rules.company_id} className="da-mb-8"
                   {...getErrorProps(errors['company_id'])}
        >
          <Select
            showSearch
            placeholder="Select a user third party"
            options={companiesOptions}
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
