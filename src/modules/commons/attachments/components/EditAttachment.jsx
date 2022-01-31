import { Form, Input } from "antd";
import { CancelButton, SaveButton, ModalComponent } from "@comps/components";
import { makeRequest, getErrorProps, notify } from "@utils/helpers";
import React, { useEffect, useState } from "react";
import { updateAttachment, getAttachment } from "../requests";

const formName = "updateAttachment";

const EditAttachment = (props) => {
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState([]);

  const getSelectFieldsData = () => {
    makeRequest(setLoader, getAttachment, props.id, AttachmentData, Function);
  }

  useEffect(() => {
    getSelectFieldsData();
    // eslint-disable-next-line
  }, []);



  const onFinish = (res) => {
    let payload = { "name": res.name, "id": data.object.id }
    makeRequest(setLoader, updateAttachment, payload, onSuccess, onError);
  }

  const AttachmentData = (res) => {
    setData(res);
  }

  const onError = (err) => {
    let errorList = [];
    errorList['name'] = err.name;
    setErrors(errorList);
  }

  const onSuccess = (res) => {
    notify("Attachment Updated", res.msg);
    props.onUpdated(res);
  }


  // ------------------------------------
  // Start footer buttons array
  // ------------------------------------
  const footer = [
    <SaveButton form={ formName } key="update_button" htmlType="submit" state={ loader } />,
    <CancelButton key="close_button" onClick={ () => props.onUpdated(false) } />
  ];
  // ------------------------------------
  // Eend footer buttons array
  // ------------------------------------

  if(data.length===0){
    return "";
  }
  return (
    <ModalComponent mainTitle="Update" subTitle="Attachment" visible={ true } footer={ footer } onCancel={ () => props.onUpdated(false) }>
      <Form
        layout="vertical"
        name={ formName }
        onFinish={ onFinish }
        initialValues={data.object}
      >
        <Form.Item name="name" rules={ rules.name } label="Name :" className="da-mb-16"
          { ...getErrorProps(errors['name']) }
        >
          <Input />
        </Form.Item>

      </Form>
    </ModalComponent>
  );
}

export default EditAttachment;

const rules = {
  name: [
    { required: true, message: 'Please input your name!', },
    { min: 3, message: 'Minimum name length is 3', },
    { max: 100, message: 'Maximum name length is 100', },
  ],
};
