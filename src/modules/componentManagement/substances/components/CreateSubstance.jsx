import React, { useState } from "react";
import { Form, Input } from "antd";
import { CancelButton, SaveButton, ModalComponent } from "@comps/components";
import { makeRequest, getErrorProps, notify } from "@utils/helpers";
import { createSubstance } from "../requests";

const formName = "createSubstance";
const CreateSubstance = (props) => {

  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]);

  const onFinish = (data) => {
    let payload = { "object": data }
    makeRequest(setLoader, createSubstance, payload, onSuccess, onError);
  }

  const onSuccess = (data, res) => {
    notify("Substance Created", res.msg);
    props.onCreated(data.object);
  }

  const onError = (err) => {
    let errorList = [];
    errorList['name'] = err.name;
    setErrors(errorList);
  }

  // ------------------------------------
  // Start footer buttons array
  // ------------------------------------
  const footer = [
    <SaveButton form={formName} key="create_button" htmlType="submit" state={loader} />,
    <CancelButton key="close_button" onClick={() => props.onCreated(false)} />
  ];
  // ------------------------------------
  // Eend footer buttons array
  // ------------------------------------

  return (
    <ModalComponent mainTitle="Create" subTitle="Substances" visible={true} footer={footer} onCancel={() => props.onCreated(false)}>
      <Form
        layout="vertical"
        name={formName}
        onFinish={onFinish}
      >
        <Form.Item name="name" rules={rules.name} label="Substances Name :" className="da-mb-16"
          {...getErrorProps(errors['name'])}
        >
          <Input />
        </Form.Item>
        <Form.Item name="cas_number" rules={rules.cas_number} label="CAS Number :" className="da-mb-16"
          {...getErrorProps(errors['cas_number'])}
        >
          <Input />
        </Form.Item>
      </Form>
    </ModalComponent>
  );
}

export default CreateSubstance

const rules = {
  name: [
    { required: true, message: 'Please input your name!', },
    { min: 3, message: 'Minimum name length is 3', },
    { max: 100, message: 'Maximum name length is 100', },
  ]
};
