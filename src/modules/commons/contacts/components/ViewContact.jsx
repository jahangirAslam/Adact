import React, { useState } from "react";
import { Form, Input, Skeleton } from "antd";
import { CancelButton, ModalComponent } from "@comps/components";
import { makeRequest, notify } from "@utils/helpers";
import { getContact } from "../requests";
import { useEffect } from "react";


const ViewContact = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    makeRequest(Function, getContact, props.id, onContactSuccess, onContactError);
    // eslint-disable-next-line
  }, []);

  const onContactSuccess = (res) => {
    setData(res);
  }

  const onContactError = (res) => {
    notify(res.msg)
  }

  // ------------------------------------
  // Start footer buttons array
  // ------------------------------------
  const footer = [
    <CancelButton key="close_button" onClick={ () => props.onUpdated(false) } />
  ];
  // ------------------------------------
  // Eend footer buttons array
  // ------------------------------------

  if (data.length === 0) {
    return <Skeleton />
  }

  return (
    <ModalComponent mainTitle="View" subTitle="Contact" visible={ true } footer={ footer } onCancel={ () => props.onUpdated(false) }>
      <Form
        layout="vertical"
        initialValues={ data.object }
      >
        <Form.Item name="first_name" label="First Name :" className="da-mb-16">
          <Input disabled={ true } />
        </Form.Item>
        <Form.Item name="last_name" label="Last Name :" className="da-mb-16">
          <Input disabled={ true } />
        </Form.Item>
        <Form.Item name="email" label="Email :" className="da-mb-16">
          <Input disabled={ true } />
        </Form.Item>
        <Form.Item name="landline" label="Landline :" className="da-mb-16">
          <Input disabled={ true } />
        </Form.Item>
        <Form.Item name="mobile" label="Mobile :" className="da-mb-16">
          <Input disabled={ true } />
        </Form.Item>

      </Form>
    </ModalComponent>
  );
}

export default ViewContact
