import { Form, Input, Select } from "antd";
import { CancelButton, SaveButton, ModalComponent, Dropzone } from "@comps/components";
import { makeRequest, makeRequestStateless, getErrorProps, notify } from "@utils/helpers";
import React, { useEffect, useState } from "react";
import { uploadDocumentRequest, getDocumentDependencies, uploadFileS3, updateDocument } from "../requests";

const formName = "createDocument";

const CreateDocument = (props) => {
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]);
  const [document, setDocument] = useState([]);
  const [file, setFile] = useState([]);
  const [deps, setDeps] = useState({
    types: []
  });

  const getSelectFieldsData = () => {
    makeRequestStateless(getDocumentDependencies, null, onDependencySuccess, null);
  }

  useEffect(() => {
    getSelectFieldsData();
    // eslint-disable-next-line
  }, []);

  const onDocumentSuccess = (res) => {
    setLoader(true);
    setDocument(res);
  }

  const onFinish = (data) => {
    let payload = { "name": data.name, "type_id": document.type_id, "id": document.id, "is_used":true  }
    let s3Payload = {"url":"https://adact-test.s3.eu-west-2.amazonaws.com/"+document.path,"data":file}
    uploadFileS3(s3Payload);
    makeRequest(setLoader, updateDocument, payload, onSuccess, onError);
  }

  const onError = (err) => {
    let errorList = [];
    errorList['name'] = err.name;
    setErrors(errorList);
  }

  const onSuccess = (res) => {
    notify("Document Upload", res.msg);
    props.onCreated(res);
  }


  const onDependencySuccess = (data, res) => {
    setDeps({
      types: data.types,
    });
  }

  const uploadDocument = (files) => {
    const data = new FormData();
    data.append('file', files[0], files.name);
    makeRequest(setLoader, uploadDocumentRequest, data, onDocumentSuccess, onError);
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
    <ModalComponent mainTitle="Upload" subTitle="Document" visible={ true } footer={ footer } onCancel={ () => props.onCreated(false) }>
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

        <Form.Item name="type_id" label="Select Type :" rules={ rules.type_id } className="da-mb-8"
          { ...getErrorProps(errors['type_id']) }
        >
          <Select
            showSearch
            placeholder="Select a type"
            options={ deps.types }
          />
        </Form.Item>
        <Dropzone text="Drag or Click Here To Upload File" multiple={ false } files={ uploadDocument } loader={ loader } />
      </Form>
    </ModalComponent>
  );
}

export default CreateDocument;

const rules = {
  name: [
    { required: true, message: 'Please input your name!', },
    { min: 3, message: 'Minimum name length is 3', },
    { max: 100, message: 'Maximum name length is 100', },
  ],
};
