import { ButtonComponent } from "@comps/components";
import { makeRequest, notify } from "@utils/helpers";
import { Col, Form, Row, Skeleton, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getAcSettings, addAcSettings, getCompanys, getCompany, updateCompany } from "./requests"


const formName = "accountSettings";

const AcountSetting = (props) => {
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState([]);
  const [setting, setSetting] = useState({});
  const [length, setLength] = useState({});

  const onCompanySuccess = (res) => {
    setData(res);
  };

  const onCompanyError = (res) => {
    notify(res.msg);
  };
 
  const getSelectFieldsData = () => {
  
    makeRequest(setLoader, getCompany, id, onDependencySuccess, onError);
  };

  useEffect(() => {
    getSelectFieldsData();
  }, []);

  const onDependencySuccess = (data, res) => {
    
    setSetting(data.object)
   
  };

  const onCancel = () => {
    history.push(`/common/companies`);
  };
  const onFinish = (data) => {

    const payload = {
      companies_id: id,
      id: id,
      ...data,
    };
  

    makeRequest(setLoader, updateCompany, payload, onSuccess, onError);
  }

  const onSuccess = (data, res) => {

    setSetting(data.object)
    notify("Updated", res.msg);
    props.onUpdated(data.object);

  };

  const onError = (err) => {
    let errorList = [];
    errorList["name"] = err.first_name;
    setErrors(errorList);
  };

  if (loader) {
    return <Skeleton />;
  }

  return (
    <>
      <div className="da-p-32">
        <Form
          initialValues={setting ? setting : {}}
          layout="vertical"
          // labelCol={{ span: 7 }}
          onFinish={onFinish}
        >
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={24} sm={24}>
              <h3 className="headerHeadings">Account Setting</h3>
            </Col>
            <Col className="gutter-row " span={12} xs={12}>
              <h5>Account Type</h5>

              <Row>
                <Col span={12} xs={12}>
                  <Form.Item
                    name="smes"
                    label="Small And Medium Size SMES :"
                    className="da-mb-16"
                  >
                    <Switch defaultChecked={setting?.smes} />
                  </Form.Item>
                  <Form.Item
                    name="customer"
                    label="Enterprises (SMEs) Customers  :"
                    className="da-mb-16"
                  >
                    <Switch defaultChecked={setting?.customer} />
                  </Form.Item>

                  <Form.Item
                    name="labolatory"
                    label="Laboratory :"
                    className="da-mb-16"
                  >
                    <Switch defaultChecked={setting?.labolatory} />
                  </Form.Item>
                </Col>
                <Col span={12} xs={12}>
                  <Form.Item
                    name="agent"
                    label="Agent :"
                    className="da-mb-16"
                  >
                    <Switch defaultChecked={setting?.agent} />
                  </Form.Item>
                  <Form.Item
                    name="manufacturer"
                    label="Manufacturer :"
                    className="da-mb-16"
                  >
                    <Switch defaultChecked={setting?.manufacturer} />
                  </Form.Item>

                  <Form.Item
                    name="supplier"
                    label="Supplier :"
                    className="da-mb-16"
                  >
                    <Switch defaultChecked={setting?.supplier} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col className="gutter-row " span={12} xs={12}>
              <h5>Account Status</h5>
              <Form.Item
                name="account_status"
                label="Account Status :"
                className="da-mb-16"
              >
                <Switch defaultChecked={setting?.account_status} />
              </Form.Item>
            </Col>
          </Row>
          <Col span={24} xs={24} className="da-mt-32 da-text-align-right">
            <Form.Item style={{ textAlign: "end" }}>
              <ButtonComponent
                className="da-mr-10"
                type="primary"
                htmlType="submit"
                state={loader}
              >
                Apply
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
