import React, { useState } from "react";
import { Col, Form, Input, Row, Switch } from "antd";
import { CancelButton, SaveButton, ModalComponent } from "@comps/components";
import { makeRequest, getErrorProps, notify } from "@utils/helpers";
import { createChemicalCompound } from "../requests";

const formName = "createChemicalCompound";
const CreateChemicalCompound = (props) => {

  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]);

  const onFinish = (data) => {
    const load = {
      customer_id: 18,
      ...data
    }
    
    let payload = { "object": load }
    makeRequest(setLoader, createChemicalCompound, payload, onSuccess, onError);
  }

  const onSuccess = (data, res) => {
    notify("Chemical Compound Created", res.msg);
    props.onCreated(res);
  }

  const onError = (err) => {
    let errorList = [];
    errorList['name'] = err.name;
    setErrors(errorList);
  }
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };


  // ------------------------------------
  // Start footer buttons array
  // ------------------------------------
  const footer = [
    <SaveButton form={formName} key="create_button" htmlType="submit" state={loader} />
  ];
  // ------------------------------------
  // Eend footer buttons array
  // ------------------------------------

  return (
    <ModalComponent
      mainTitle="Create"
      subTitle="Global Template"
      visible={true}
      footer={footer}
      onCancel={() => props.onCreated(false)}
    >
      <Form layout="vertical" name={formName} onFinish={onFinish}>
        <Form.Item
          name="subject"
          rules={rules.name}
          label="Subject :"
          className="da-mb-16"
          
        >
          <Input />
        </Form.Item>
        <Row>
          <Col span={10}>
            <h5>Document Type</h5>
            <Form.Item
              name="tpd_document_type"
              label="TPD Document"
              className="da-mb-16"
              
            >
              <Switch defaultChecked onChange={onChange} />
            </Form.Item>
            <Form.Item
              name="pmta_document_type"
              label="PMTA Document"
              className="da-mb-16"
              
            >
              <Switch defaultChecked onChange={onChange} />
            </Form.Item>
            <Form.Item
              name="mhra_document_type"
              label="MHRA Document"
              className="da-mb-16"
              
            >
              <Switch defaultChecked onChange={onChange} />
            </Form.Item>
            <Form.Item
              name="cbd_document_type"
              label="CBD Document"
              className="da-mb-16"
              
            >
              <Switch defaultChecked onChange={onChange} />
            </Form.Item>
          </Col>
          <Col span={10} offset={4}>
            <h5>Default For</h5>
            <Form.Item
              name="tpd_default_for"
              label="TPD Document"
              className="da-mb-16"
              
            >
              <Switch defaultChecked onChange={onChange} />
            </Form.Item>
            <Form.Item
              name="mhra_default_for"
              label="MHRA Document"
              className="da-mb-16"
              
            >
              <Switch defaultChecked onChange={onChange} />
            </Form.Item>
            <Form.Item
              label="FDA"
              name="fda_default_for"
              className="da-mb-16"
              
            >
              <Switch defaultChecked onChange={onChange} />
            </Form.Item>
            <Form.Item
              name="cbd_default_for"
              label="CBD"
              className="da-mb-16"
              
            >
              <Switch defaultChecked onChange={onChange} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalComponent>
  );
}

export default CreateChemicalCompound

const rules = {
  name: [
    { required: true, message: "Please input your name!" },
    { min: 3, message: "Minimum name length is 3" },
    { max: 100, message: "Maximum name length is 100" },
  ],
  reference: [
    { required: true, message: "Please input reference!" },
    { min: 3, message: "Minimum name length is 3" },
    { max: 100, message: "Maximum name length is 100" },
  ],
};
