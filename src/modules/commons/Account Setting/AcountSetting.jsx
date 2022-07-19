import { ButtonComponent } from "@comps/components";
import { Col, Divider, Form, Row, Skeleton, Switch } from "antd";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import {
  getLocationDependencies
} from "@mods/commons/locations/requests";
import {
  makeRequest, makeRequestStateless, notify
} from "@utils/helpers";
import { useEffect } from "react";
import { addAcSettings, getCompany } from "./requests";
import { updateContact } from "../contacts/requests";
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
  const onFinish = (data) => {
    const load = {
      companies_id: id,
      ...data
    }
    let payload = { "object": load }

    makeRequest(setLoader,addAcSettings, payload, onSuccess, onError);
  }

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
          // labelCol={{ span: 7 }}
          onFinish={onFinish}
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
                    name="smes"
                    label="Small And Medium Size SMES :"
                    className="da-mb-16"
                  >
                    <Switch />
                  </Form.Item>

               
                  <Form.Item
                    name="labolatory"
                    label="Laboratory :"
                    className="da-mb-16"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="agent"
                    label="Agent :"
                    className="da-mb-16"
                  >
                    <Switch />
                  </Form.Item>
                  <Form.Item
                    name="manufacturer"
                    label="Manufacturer :"
                    className="da-mb-16"
                  >
                    <Switch />
                  </Form.Item>
                  <Form.Item
                    name="supplier"
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
                name="account_status"
                label="Account Status :"
                className="da-mb-16"
              >
                <Switch />
              </Form.Item>


            </Col>
          </Row>
          <Col span={24} className="da-mt-32 da-text-align-right">
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
          </Col>
        </Form>

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
