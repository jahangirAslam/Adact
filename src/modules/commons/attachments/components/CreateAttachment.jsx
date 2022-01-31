import { Form, Input } from "antd";
import { CancelButton, SaveButton, ModalComponent, Dropzone } from "@comps/components";
import { makeRequest, getErrorProps, notify } from "@utils/helpers";
import React, { useEffect, useState } from "react";
import { uploadAttachmentRequest, uploadFileS3, updateAttachment } from "../requests";

const formName = "createAttachment";

const CreateAttachment = (props) => {
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]);
  const [Attachment, setAttachment] = useState([]);
  const [file, setFile] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  const onAttachmentSuccess = (res) => {
    setLoader(true);
    setAttachment(res);
  }

  const onFinish = (data) => {
    let payload = { "name": data.name, "type_id": Attachment.type_id, "id": Attachment.id, "is_used":true  }
    let s3Payload = {"url":Attachment.bucket+Attachment.path,"data":file}
    uploadFileS3(s3Payload);
    makeRequest(setLoader, updateAttachment, payload, onSuccess, onError);
  }

  const onError = (err) => {
    let errorList = [];
    errorList['name'] = err.name;
    setErrors(errorList);
  }

  const onSuccess = (res) => {
    notify("Attachment Upload", res.msg);
    props.onCreated(res);
  }

  const uploadAttachment = (files) => {
    const data = new FormData();
    data.append('file', files[0], files.name);
    makeRequest(setLoader, uploadAttachmentRequest, data, onAttachmentSuccess, onError);
    setFile(data);
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
    <ModalComponent mainTitle="Upload" subTitle="Attachment" visible={ true } footer={ footer } onCancel={ () => props.onCreated(false) }>
      <Form
        layout="vertical"
        name={ formName }
        onFinish={ onFinish }
      >
        <Form.Item name="name" rules={ rules.name } label="Name :" className="da-mb-16"
          { ...getErrorProps(errors['name']) }
        >
          <Input />
        </Form.Item>

        <Dropzone text="Drag or Click Here To Upload File" multiple={ false } files={ uploadAttachment } loader={ loader } />
      </Form>
    </ModalComponent>
  );
}

export default CreateAttachment;

const rules = {
  name: [
    { required: true, message: 'Please input your name!', },
    { min: 3, message: 'Minimum name length is 3', },
    { max: 100, message: 'Maximum name length is 100', },
  ],
};
