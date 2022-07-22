import { CancelButton, ModalComponent, SaveButton } from "@comps/components";
import {
  getErrorProps,
  makeRequest,
  notify,
  makeRequestStateless,
} from "@utils/helpers";
import { Form, Input, Avatar, Row, Checkbox, Button,Col } from "antd";
import React, { useEffect, useState } from "react";
import Man from "@assets/images/menu/man.svg";
import { useSelector } from "react-redux";

// import { createFlavour, getProductDependencies } from "./request";
const AvatarIcon = () => {
  return <img src={Man} alt="Avatar" />;
};

const formName = "createFlavour";

const Profile = (props) => {
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.auth.authUser);
  const [deps, setDeps] = useState({
    manufacturers: [],
  });

  const onFinish = (values) => {
    console.log("Success:", values);
    debugger;
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onSuccess = (data, res) => {
    notify("Product Created", res.msg);
    props.onCreated(res);
  };

  const getSelectFieldsData = () => {
    // makeRequestStateless(getProductDependencies, null, onDependencySuccess, null);
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

  const onError = (err) => {
    let errorList = [];
    errorList["name"] = err.name;
    setErrors(errorList);
  };

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
  ];
  // ------------------------------------
  // Eend footer buttons array
  // ------------------------------------

  return (
    <>
      <Row justify="center">
        <Avatar src={user.profile_url} icon={<AvatarIcon />} size={120} />
      </Row>
      <Form
        name="basic"
        labelCol={{
          span: 23,
        }}
        wrapperCol={{
          span: 23,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Row>
          <Col span={12} xs={12}>
            <Form.Item
              name="name"
              // rules={rules.name}
              label="First Name :"
              className="da-mb-12"
              {...getErrorProps(errors["name"])}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12} xs={12}>
            <Form.Item
              name="name"
              // rules={rules.name}
              label=" Last Name :"
              className="da-mb-12"
              {...getErrorProps(errors["name"])}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12} xs={12}>
            <Form.Item
              name="name"
              // rules={rules.name}
              label=" Email :"
              className="da-mb-12"
              {...getErrorProps(errors["name"])}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          {/* <Col span={10} >
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          </Col> */}
          <Col span={24} className="profilebtn" >
          <Form.Item
          >
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Profile;
