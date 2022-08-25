import { UploadOutlined } from "@ant-design/icons";
import { ModalComponent, SaveButton,Dropzone } from "@comps/components";
import {
    makeRequest,
    makeRequestStateless,
    notify
} from "@utils/helpers";
import { Button, Col, Divider, Form, Input, message, Row, Select, Switch, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { createProduct, getProductDependencies,uploadDocumentRequest } from "./request";
// for file upload

const formName = "createFlavour";
const CreateAttachment = (props) => {
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]);
  const [document, setDocument] = useState([]);
  const [file, setFile] = useState([]);
  const[select ,setSelect]=useState("")
  const [deps, setDeps] = useState({
    product_categories: [],
    types: [],
    customers: [],
    typeB: [],
  });

  const onFinish = (data) => {
    let load = {
      ec_five: Math.floor(1000 + Math.random() * 90000),
      ecid: `${Math.floor(
        1000 + Math.random() * 90000
      )}-${new Date().getFullYear()}`,
      on_market: new Date().toISOString().slice(0, 10),
      ...data,
    };
    let payload = { object: load };
    makeRequest(setLoader, createProduct, payload, onSuccess, onError);
  };

  const onSuccess = (data, res) => {
    notify("Flavour Created", res.msg);
    props.onCreated(res);
  };

  const getSelectFieldsData = () => {
    makeRequestStateless(
      getProductDependencies,
      null,
      onDependencySuccess,
      null
    );
  };

  useEffect(() => {
    getSelectFieldsData();
    // eslint-disable-next-line
  }, []);
  const onDocumentSuccess = (res) => {
    setLoader(true);
    setDocument(res);
  }
  const onDependencySuccess = (data, res) => {
    setDeps({
      product_categories: data.product_categories,
      types: data.product_types,
      customers: data.customers,
      typeB: data.e_types,
    });
  };

  const onError = (err) => {
    let errorList = [];
    errorList["name"] = err.name;
    setErrors(errorList);
  };
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    
  };
  const handleChange = (value) => {
    setSelect(value)
    debugger;
  };
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
    <SaveButton
      form={formName}
      key="create_button"
      htmlType="submit"
      state={loader}
    />,
    // <CancelButton key="close_button" onClick={() => props.onCreated(false)} />
  ];
  // ------------------------------------
  // Eend footer buttons array
  // ------------------------------------

  return (
    <ModalComponent
      mainTitle="Add a"
      subTitle="File"
      visible={true}
      footer={footer}
      onCancel={() => props.onCreated(false)}
    >
      <Form layout="vertical" name={formName} onFinish={onFinish}>
        <Row>
          <Col sm={24}>
            <h5>Submission</h5>
          </Col>
          <Col sm={8}>
            <Form.Item name="tpd" label="TPD" className="da-mb-16">
              <Switch defaultChecked onChange={onChange} />;
            </Form.Item>
          </Col>
          <Col sm={8}>
            <Form.Item name="mhra" label="MHRA" className="da-mb-16">
              <Switch defaultChecked onChange={onChange} />;
            </Form.Item>
          </Col>
          <Col sm={8}>
            <Form.Item name="pmta" label="PMTA" className="da-mb-16">
              <Switch onChange={handleChange}  />;
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col sm={24}>
            <h5>Category</h5>
          </Col>
          <Col sm={24}>
            <Form.Item name="category" label="Category" className="da-mb-16">
              <Select
                showSearch
                placeholder="Customer Name"
                // options={deps.customers}
              />
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item
              name="attachment_name"
              label="Attachment Name"
              className="da-mb-16"
            >
              <Input />
            </Form.Item>
          </Col>
          { select===true ?(<Col sm={24}>
            <Form.Item
              name="subject"
              label="Subject "
              className="da-mb-16"
            >
              <Input />
            </Form.Item>
          </Col>)
          :""            
          }
         
          
          <Col sm={24}>
            <Form.Item  name="file" label="File" className="da-mb-16">
            <Dropzone text="Drag or Click Here To Upload File" multiple={ false } files={ uploadDocument } loader={ loader } />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalComponent>
  );
};

export default CreateAttachment;

const rules = {
  name: [
    { required: true, message: "Please input your name!" },
    { min: 3, message: "Minimum name length is 3" },
    { max: 100, message: "Maximum name length is 100" },
  ],
  email: [
    { type: "email", message: "The input is not valid email!" },
    { required: true, message: "Please input your email!" },
  ],
  country: [{ required: true, message: "Please select country!" }],
};
