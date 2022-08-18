import { ButtonComponent } from "@comps/components";
import { getErrorProps, makeRequest, notify,  makeRequestStateless,
} from "@utils/helpers";
import { Col, Divider, Form, Input, Row, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { updateSubstance,getProductDependencies } from "../request";

const FlavourInformation = (props) => {
  
  const [loader, setLoader] = useState("");
  const [errors, setErrors] = useState([]);
  const [deps, setDeps] = useState({
    manufacturers: [],
  });
  const onFinish = (payload) => {
    payload.id = props.data.id;
    makeRequest(setLoader, updateSubstance, payload, onSuccess, onError);
  };

  const onSuccess = (data, res) => {
    notify("Substance", res.msg);
  };

  const onError = (err) => {
    let errorList = [];
    errorList["password"] = err;
    setErrors(errorList);
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

  const onDependencySuccess = (data, res) => {
    setDeps({
      manufacturers: data.manufacturers,
    });
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
        <Col className="gutter-row" xs={24} md={12} lg={8} >
          <Form.Item
            name="name"
            rules={rules.name}
            label="Name :"
            {...getErrorProps(errors["name"])}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} lg={8}>
          <Form.Item name="fed_uuin" label="fed_uuin :">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} lg={8}>
          <Form.Item name="manufacturer_id" label="Manufacturer Name :">
          <Select
            showSearch
            placeholder="Select  Manufacturer"
            options={deps.manufacturers}
          />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} lg={8}>
          <Form.Item name="manufacturer_ref" label="manufacturer_ref :">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} lg={8}>
          <Form.Item name="has_recipe" label="Has Recipe :">
            <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} lg={8}>
          <Form.Item name="is_valid_manufacturer" label="The manufacturer records are valid?">
            <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} lg={8}>
          <Form.Item name="is_valid_manufacturer" label="Recipe is valid">
            <Input disabled={true} />
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="left" />
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={8}>
          <Form.Item name="is_active" label="Flavour status">
            <Switch defaultChecked={props.data.is_active} />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={8}>
          <Form.Item name="in_testing" label="Test Mode :">
            <Switch defaultChecked={props.data.in_testing} />
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="left" />
      <Row gutter={[16, 24]}>
      <Col className="gutter-row" span={11}>
          <Form.Item name="updated_on" label="Last Updated On">
          <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={11}>
          <Form.Item name="updated_on" label="Last Updated By">
          <Input disabled={true} />
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

export default FlavourInformation;

const rules = {
  name: [
    { required: true, message: "Please input your password!" },
    { min: 3, message: "Minimum password length is 3" },
    { max: 100, message: "Maximum password length is 100" },
  ],
  role_id: [{ required: true, message: "Please select user role!" }],
  company_id: [{ required: true, message: "Please select user third party!" }],
};
