import React, { useState } from "react";
import { Form, Input } from "antd";
import { CancelButton, SaveButton, ModalComponent } from "@comps/components";
import { makeRequest, getErrorProps, notify } from "@utils/helpers";
import { createChemicalCompound } from "../requests";

const formName = "createChemicalCompound";
const CreateChemicalCompound = (props) => {

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
      subTitle="Chemical Compounds"
      visible={true}
      footer={footer}
      onCancel={() => props.onCreated(false)}
    >
      <Form layout="vertical" name={formName} onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={rules.name}
          label="Compound Name :"
          className="da-mb-16"
          {...getErrorProps(errors["name"])}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="reference"
          rules={rules.reference}
          label="Compound Reference :"
          className="da-mb-16"
          {...getErrorProps(errors["reference"])}
        >
          <Input />
        </Form.Item>
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
