import { Form, Input } from "antd";
import React from "react";
import { formatCompleteData } from "@utils/helpers";

const ViewDetails = ({ data }) => {
  let dataSource = { ...data, tested_date: formatCompleteData(data.tested_date) }
  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 5 }}
      initialValues={dataSource}
    >
      <Form.Item name="type" label="Type :" className="da-mb-16">
        <Input disabled={true} />
      </Form.Item>
      <Form.Item name="test_ref" label="Rest REF :" className="da-mb-16">
        <Input disabled={true} />
      </Form.Item>
      <Form.Item name="status" label="Status :" className="da-mb-16">
        <Input disabled={true} />
      </Form.Item>
      <Form.Item name="tested_date" label="Tested Date :" className="da-mb-16">
        <Input disabled={true} />
      </Form.Item>


    </Form>
  );
}

export default ViewDetails;
