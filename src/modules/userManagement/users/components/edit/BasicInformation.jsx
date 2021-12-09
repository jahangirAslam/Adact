import React, { useState } from "react";
import { Form, Input, Select } from "antd";

import { makeRequest, getErrorProps, notify } from "@utils/helpers";
import { updateUser } from "../../requests";
import { ButtonComponent } from "@comps/components";

const BasicInformation = (props) => {
  const [loader, setLoader] = useState('');
  const [errors, setErrors] = useState([]);

  const onFinish = (payload) => {
    payload.id = props.data.id;
    makeRequest(setLoader, updateUser, payload, onSuccess, onError);
  }

  const onSuccess = (data, res) => {
    notify("User", res.msg);
  }

  const onError = (err) => {
    let errorList = [];
    errorList['password'] = err;
    setErrors(errorList);
  }


  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 5 }}
      initialValues={props.data}
      onFinish={onFinish}
    >
      <Form.Item name="name" rules={rules.name} label="Name :" className="da-mb-16"
        {...getErrorProps(errors['name'])}
      >
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email :" className="da-mb-16">
        <Input disabled />
      </Form.Item>
      <Form.Item name="role_id" label="Select Role :" rules={rules.role_id} className="da-mb-8"
        {...getErrorProps(errors['role_id'])}
      >
        <Select
          showSearch
          placeholder="Select a user role"
          options={props.dependencies.roles}
        />
      </Form.Item>
      <Form.Item name="company_id" label="Select Third Party :" rules={rules.company_id} className="da-mb-8"
        {...getErrorProps(errors['company_id'])}
      >
        <Select
          showSearch
          placeholder="Select a user third party"
          options={props.dependencies.companies}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5 }}>
        <ButtonComponent className="da-mr-10" type="primary" htmlType="submit" state={loader}>Submit</ButtonComponent>
        <ButtonComponent type="primary">Reset Password</ButtonComponent>
      </Form.Item>
    </Form>
  );
}

export default BasicInformation;

const rules = {
  name: [
    { required: true, message: 'Please input your password!', },
    { min: 3, message: 'Minimum password length is 3', },
    { max: 100, message: 'Maximum password length is 100', },
  ],
  role_id: [
    { required: true, message: 'Please select user role!', },
  ],
  company_id: [
    { required: true, message: 'Please select user third party!', },
  ],
};
