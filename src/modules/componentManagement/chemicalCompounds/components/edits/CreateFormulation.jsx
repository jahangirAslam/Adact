import React, { useState } from "react";
import { Col, Form, Input, InputNumber, Row, Select, Switch } from "antd";
import { CancelButton, SaveButton, ModalComponent } from "@comps/components";
import { makeRequest, getErrorProps, notify } from "@utils/helpers";
import { createChemicalCompound } from "../../requests";

const formName = "createChemicalCompound";
const CreateFormulation = (props) => {

  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]);

  const onFinish = (data) => {
    let payload = { "object": data }
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
    <SaveButton form={formName} key="create_button" htmlType="submit" state={loader} />,
  ];
  // ------------------------------------
  // Eend footer buttons array
  // ------------------------------------

  return (
    <ModalComponent
      mainTitle="Create"
      subTitle="Substance"
      visible={true}
      footer={footer}
      onCancel={() => props.onCreated(false)}
    >
      <Form layout="vertical" name={formName} onFinish={onFinish}>
        <Row>
            <Col span={24}>
            <Form.Item name="customer_id" label="Select Components :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select Components"
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
        <Form.Item
         
          className="da-mb-16"
          {...getErrorProps(errors["name"])}
        >
             <InputNumber className="formulationAdd" defaultValue={5} />

        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item
         
          className="da-mb-16"
          {...getErrorProps(errors["name"])}
        >
             <InputNumber  className="formulationAdd" disabled="true" />

        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item
         label="After Adding Components"
          className="da-mb-16"
          {...getErrorProps(errors["name"])}
        >
            <Switch defaultChecked onChange={onChange}/>;
        </Form.Item>
        </Col>
        </Row>
      </Form>
    </ModalComponent>
  );
}

export default CreateFormulation

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
