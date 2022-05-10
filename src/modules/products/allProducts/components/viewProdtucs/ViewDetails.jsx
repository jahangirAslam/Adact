import React from "react";
import { Form, Input, Select } from "antd";

const ViewDetails = (props) => {

  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 5 }}
      initialValues={props.data}
    >
      <Form.Item name="name" label="Name :" className="da-mb-16">
        <Input disabled={true} />
      </Form.Item>
      <Form.Item name="id" label="id :" className="da-mb-16">
        <Input disabled={true} />
      </Form.Item>
      <Form.Item name="category_name" label="category_name :" className="da-mb-16">
        <Input disabled={true} />
      </Form.Item>
      <Form.Item name="category_id" label="category_id :" className="da-mb-16">
        <Input disabled={true} />
      </Form.Item>
    </Form>
  );
}

export default ViewDetails;
