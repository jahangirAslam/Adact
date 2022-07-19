import React, { useState } from "react";
import { Form, Input, Row, Col, Divider, Switch, Select } from "antd";
import { makeRequest, getErrorProps, notify } from "@utils/helpers";
import { updateChemicalCompound } from "../../requests";
import { ButtonComponent } from "@comps/components";
import TextArea from "antd/lib/input/TextArea";


const BasicInformation = (props) => {
  const [loader, setLoader] = useState("");
  const [errors, setErrors] = useState([]);

  const onFinish = (payload) => {
    payload.id = props.data.id;
    makeRequest(setLoader, updateChemicalCompound, payload, onSuccess, onError);
  };

  const onSuccess = (data, res) => {
    notify("Substance", res.msg);
  };

  const onError = (err) => {
    let errorList = [];
    errorList["password"] = err;
    setErrors(errorList);
  };
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  // const onChange = (e) => {
  //   console.log("radio checked", e.target.value);
  //   setValue(e.target.value);
  // };

  return (
    <Form
      layout="vertical"
      // labelCol={{ span: 7 }}
      initialValues={props.data}
      onFinish={onFinish}
    >
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" xs={24} md={12} lg={12}  >
          <h3 className="TemplateHeader">Subject </h3>
          <Form.Item
            name="subject"
            rules={rules.name}
            label="Test :"
            {...getErrorProps(errors["name"])}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            rules={rules.name}
            label="Description :"
            {...getErrorProps(errors["name"])}
          >
            <TextArea className="templateDiscription" rows={4} placeholder="Description" maxLength={200} />
          </Form.Item>
          <h5 className="TemplateHeader">Master File</h5>
          <Form.Item name="master_file" label="Assign to table of Content :">
          <Select />
          </Form.Item>
          <h5 className="TemplateHeader">Content</h5>
          {/* text Editor */}
          <h3 className="TemplateHeader">Status </h3>
          <Form.Item name="update_on" label=" Update On:">
            <Input disabled />
          </Form.Item>
          <Form.Item name="updated_by" label=" Updated:">
            <Input disabled />
          </Form.Item>
          <Form.Item name="validation_status" label="Validation Status :">
          <Select />
          </Form.Item>
          <Form.Item name="validated_on" label="Validate on :">
            <Input disabled />
          </Form.Item>
          <Form.Item name="validated_by" label="Validated By :">
            <Input disabled />
          </Form.Item>



        </Col>
        <Col className="gutter-row" xs={24} md={12} lg={11} offset={1}>
        <h3 className="TemplateHeader">Report Level </h3>
          <Form.Item name="report_level" label="Overview :">
            <Input />
          </Form.Item>
          <h5 className="TemplateHeader">Apply This Templates To Specified Product Type</h5>
          <Form.Item name="product_type" label="Not Set :">
            <Select />
          </Form.Item>
          <h5 className="TemplateHeader">Document Visibility</h5>
          <Form.Item name="confidential_visibility" label="Not Confidental :">
          <Switch defaultChecked onChange={onChange} />;

          </Form.Item>
          <Form.Item name="descrpublic_private_visibilityiption" label="Public :">
          <Switch defaultChecked onChange={onChange} />
          </Form.Item>
          <h5 className="TemplateHeader">Template For</h5>
          <Form.Item name="template_for" label="Specified Customers :">
          <Switch defaultChecked onChange={onChange} />

          </Form.Item>
          <h5 className="TemplateHeader">Document Type</h5>
          <Form.Item name="tpd_document_type" label="TPD Document :">
          <Switch defaultChecked onChange={onChange} />

          </Form.Item>
          <Form.Item name="pmta_document_type" label="PMTA Document :">
          <Switch defaultChecked onChange={onChange} />

          </Form.Item>
          <Form.Item name="mhra_document_type" label="MHRA Document :">
          <Switch defaultChecked onChange={onChange} />

          </Form.Item>
          <Form.Item name="cbd_document_type" label="CBD Document :">
          <Switch defaultChecked onChange={onChange} />

          </Form.Item>
          <h5 className="TemplateHeader">Default For</h5>
          <Form.Item name="tpd_default_for" label="TPD  :">
          <Switch defaultChecked onChange={onChange} />

          </Form.Item>
          <Form.Item name="fda_default_for" label="FDA  :">
          <Switch defaultChecked onChange={onChange} />

          </Form.Item>
          <Form.Item name="mhra_default_for" label="MHRA  :">
          <Switch defaultChecked onChange={onChange} />

          </Form.Item>
          <Form.Item name="cbd_default_for" label="CBD  :">
          <Switch defaultChecked onChange={onChange} />

          </Form.Item>
        </Col>
        
      </Row>
      

      <Form.Item style={{ textAlign: "end" }}>
        <ButtonComponent
          className="da-mr-10"
          type="primary"
          htmlType="submit"
          state={loader}
        >
          Save 
        </ButtonComponent>
      </Form.Item>
    </Form>
  );
};

export default BasicInformation;

const rules = {
  name: [
    { required: true, message: "Please input your password!" },
    { min: 3, message: "Minimum password length is 3" },
    { max: 100, message: "Maximum password length is 100" },
  ],
};
