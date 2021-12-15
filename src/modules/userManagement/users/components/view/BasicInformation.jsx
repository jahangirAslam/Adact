import React from "react";
import { Form, Input, Select } from "antd";

const BasicInformation = (props) => {

  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 5 }}
      initialValues={props.data}
    >
      <Form.Item name="name" label="Name :" className="da-mb-16">
        <Input disabled={true} />
      </Form.Item>
      <Form.Item name="email" label="Email :" className="da-mb-16">
        <Input disabled={true} />
      </Form.Item>
      <Form.Item name="role_id" label="Select Role :" className="da-mb-8">
        <Select
          showSearch
          placeholder="Select a user role"
          options={props.dependencies.roles}
          disabled={true}
        />
      </Form.Item>
      <Form.Item name="company_id" label="Select Third Party :" className="da-mb-8">
        <Select
          showSearch
          placeholder="Select a user third party"
          options={props.dependencies.companies}
          disabled={true}
        />
      </Form.Item>
    </Form>
  );
}

export default BasicInformation;
