import React, { useState } from "react";
import { Form, Input, Switch } from "antd";
import { CancelButton, SaveButton, ModalComponent } from "@comps/components";
import { makeRequest, getErrorProps, notify } from "@utils/helpers";
import { createContact } from "../requests";


const formName = "createContact";

const CreateContact = (props) => {

  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]);



  const onFinish = (data) => {
    let payload = { "object": data }
    payload.object["type"] = props.type;
    makeRequest(setLoader, createContact, payload, onSuccess, onError);
  }

  const onSuccess = (data, res) => {
    notify("Contact Created", res.msg);
    props.onCreated(false);
  }

  const onError = (err) => {
    let errorList = [];
    errorList['first_name'] = err.first_name;
    errorList['last_name'] = err.last_name;
    errorList['email'] = err.email;
    errorList['phone'] = err.phone;
    setErrors(errorList);
  }

  // ------------------------------------
  // Start footer buttons array
  // ------------------------------------
  const footer = [
    <SaveButton form={ formName } key="create_button" htmlType="submit" state={ loader } />,
    <CancelButton key="close_button" onClick={ () => props.onCreated(false) } />
  ];
  // ------------------------------------
  // Eend footer buttons array
  // ------------------------------------

  return (
    <ModalComponent mainTitle="Create" subTitle="Contact" visible={ true } footer={ footer } onCancel={ () => props.onCreated(false) }>
      <Form
        layout="vertical"
        name={ formName }
        onFinish={ onFinish }
      >
        <Form.Item name="first_name" rules={ rules.first_name } label="First Name :" className="da-mb-16"
          { ...getErrorProps(errors['first_name']) }>
          <Input />
        </Form.Item>
        <Form.Item name="last_name" rules={ rules.last_name } label="Last Name :" className="da-mb-16"
          { ...getErrorProps(errors['last_name']) }>
          <Input />
        </Form.Item>
        <Form.Item name="email" rules={ rules.email } label="Email :" className="da-mb-16"
          { ...getErrorProps(errors['email']) }>
          <Input />
        </Form.Item>
        <Form.Item name="landline" rules={ rules.landline } label="Landline :" className="da-mb-16"
          { ...getErrorProps(errors['landline']) }>
          <Input />
        </Form.Item>
        <Form.Item name="mobile" rules={ rules.mobile } label="Mobile :" className="da-mb-16"
          { ...getErrorProps(errors['mobile']) }>
          <Input />
        </Form.Item>
        <Form.Item name="is_primary" label="Make it Primary :" className="da-mb-16">
          <Switch />
        </Form.Item>
      </Form>
    </ModalComponent>
  );
}

export default CreateContact

const rules = {
  first_name: [
    { required: true, message: 'Please input your first name!', },
    { min: 3, message: 'Minimum name length is 3', },
    { max: 100, message: 'Maximum name length is 100', },
  ],
  last_name: [
    { required: true, message: 'Please input your last name!', },
    { min: 3, message: 'Minimum name length is 3', },
    { max: 100, message: 'Maximum name length is 100', },
  ],
  email: [
    { type: "email", message: "The input is not valid email!" },
    { required: true, message: "Please input your email!" },
  ],
  mobile: [
    { required: true, message: 'Please input your mobile number!', },
    { min: 3, message: 'Minimum name length is 3', },
    { max: 100, message: 'Maximum name length is 100', },
  ],
};
