import { Form, Input } from "antd";
import React from "react";

const ViewDetails = (props) => {
  const data = {
    ...props.data,
    categoryName: props.data.category?.name,
    typeName: props.data.e_type[0]?.type
  };

  return (
    <Form layout="horizontal" labelCol={{ span: 5 }} initialValues={data}>
      <Form.Item name="name" label="Name :" className="da-mb-16">
        <Input disabled={true} />
      </Form.Item>
      <Form.Item name="id" label="id :" className="da-mb-16">
        <Input disabled={true} />
      </Form.Item>
      <Form.Item
        name="categoryName"
        label="Category Name :"
        className="da-mb-16"
      >
        <Input disabled={true} />
      </Form.Item>
      
      <Form.Item name="typeName" label="type :" className="da-mb-16">
        <Input disabled={true} />
      </Form.Item>
    </Form>
  );
};

export default ViewDetails;
