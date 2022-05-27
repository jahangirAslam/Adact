import { Form, Input } from "antd";
import React from "react";

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
      <Form.Item name="iupac_name" label="IUPAC Name :" className="da-mb-16">
        <Input disabled={true} />
      </Form.Item>
      <Form.Item name="ref_number" label="REF NO :" className="da-mb-16">
        <Input disabled={true} />
      </Form.Item>
      <Form.Item name="reach_number" label="REACH NO :" className="da-mb-16">
        <Input disabled={true} />
      </Form.Item>
      <Form.Item name="status" label="Status :" className="da-mb-16">
        <Input disabled={true} />
      </Form.Item>


    </Form>
  );
}

export default ViewDetails;
