import React, { useState } from "react";
import { Form, Input, Skeleton, Row, Col, Divider, Select, Switch } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { CancelButton, SaveButton } from "@comps/components";
import {
  makeRequest,
  getErrorProps,
  notify,
  makeRequestStateless,
} from "@utils/helpers";
import { getCompany, updateCompany } from "./requests";
import { useEffect } from "react";
import {
  getLocationDependencies,
  updateLocation,
} from "@mods/commons/locations/requests";
import { updateContact } from "@mods/commons/contacts/requests";
const formName = "editCompany";

const AcountSetting = (props) => {
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState([]);
  const [deps, setDeps] = useState({
    countries: [],
  });
  useEffect(() => {
    makeRequest(
      setLoader,
      getCompany,
      props.id ? props.id : id,
      onCompanySuccess,
      onCompanyError
    );
    // eslint-disable-next-line
  }, []);

  const onCompanySuccess = (res) => {
    setData(res);
  };

  const onCompanyError = (res) => {
    notify(res.msg);
  };

  const getSelectFieldsData = () => {
    makeRequestStateless(
      getLocationDependencies,
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
      countries: data.countries,
    });
  };

  const onCancel = () => {
    history.push(`/common/companies`);
  };

  const onFinish = (submitData) => {
    let payload = {
      agent_id: submitData.agent_id,
      dun_number: submitData.dun_number,
      fda_number: submitData.fda_number,
      name: submitData.name,
      short_name: submitData.short_name,
      id: props.id,
      tpd_setting: submitData.tpd_setting,
      trade_name: submitData.trade_name,
      type: submitData.type,
      vat: submitData.vat,
    };
    let location = {
      first_address: submitData.first_address,
      second_address: submitData.second_address,
      country_id: submitData.country_id,
      state: submitData.state,
      zipcode: submitData.zipcode,
      id: data.object.location_id,
    };
    let contact = {
      email: submitData.email,
      landline: submitData.landline,
      mobile: submitData.mobile,
      website: submitData.website,
      id: data.object.contact_id,
    };
    makeRequest(setLoader, updateCompany, payload, onSuccess, onError);
    makeRequest(setLoader, updateLocation, location, Function, onError);
    makeRequest(setLoader, updateContact, contact, Function, onError);
  };

  const onSuccess = (data, res) => {
    notify("Updated", res.msg);
    props.onUpdated(data.object);
  };

  const onError = (err) => {
    let errorList = [];
    errorList["name"] = err.first_name;
    setErrors(errorList);
  };

  if (data.length === 0) {
    return <Skeleton />;
  }

  return (
    <>
      <div className="da-p-32">
        <Form
          layout="vertical"
          name={formName}
          onFinish={onFinish}
          initialValues={data.object}
        >
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={24}>
              <Divider orientation="left">
                <strong>Account Setting</strong>
              </Divider>
            </Col>
            <Col className="gutter-row " span={12}>
            <h5>Account Type</h5>

              <Row>
              <Col span={12}>
              <Form.Item
                name="is_test"
                label="Small And Medium Size :"
                className="da-mb-16"
              >
                <Switch />
              </Form.Item>
              
              <Form.Item
                name="is_test"
                label="Enterprises Customers(SMES) :"
                className="da-mb-16"
              >
                <Switch  />
              </Form.Item>
              <Form.Item
                name="is_test"
                label="Laboratory :"
                className="da-mb-16"
              >
                <Switch  />
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item
                name="is_test"
                label="Agent :"
                className="da-mb-16"
              >
                <Switch />
              </Form.Item>
              <Form.Item
                name="is_test"
                label="Manufacturer :"
                className="da-mb-16"
              >
                <Switch />
              </Form.Item>
              <Form.Item
                name="is_test"
                label="Supplier :"
                className="da-mb-16"
              >
                <Switch />
              </Form.Item>
              </Col>
              </Row>
            </Col>
            <Col className="gutter-row " span={12}>
            <h5>Account Status</h5>
              <Form.Item
                name="is_test"
                label="Account Status :"
                className="da-mb-16"
              >
                <Switch />
              </Form.Item>
              
              
            </Col>
          </Row>
        </Form>
        <Col span={24} className="da-mt-32 da-text-align-right">
          <SaveButton
            className="da-mr-12"
            form={formName}
            key="create_button"
            htmlType="submit"
            state={loader}
          />
          <CancelButton key="close_button" onClick={onCancel} />
        </Col>
      </div>
    </>
  );
};

export default AcountSetting;

const rules = {
  name: [
    { required: true, message: "Please input name!" },
    { min: 3, message: "Minimum name length is 3" },
    { max: 100, message: "Maximum name length is 100" },
  ],
};
