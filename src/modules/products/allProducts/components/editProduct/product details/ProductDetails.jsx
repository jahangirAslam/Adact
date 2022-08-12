import { WarningOutlined } from "@ant-design/icons";
import { ButtonComponent } from "@comps/components";
import { getErrorProps, makeRequest, notify } from "@utils/helpers";
import { Col, DatePicker, Form, Input, Row, Select, Switch } from "antd";
import React, { useState } from "react";
import moment from 'moment';
import { useParams } from "react-router-dom";
import { updateSubstance } from "../../request";
import { formatDate, formatDayOnly, formatFullYearOnly, formatMonthOnly } from "../../../../../../utils/helpers";

const ProductDetails = (props) => {
  
  const [disabled, setDisabled] = useState(true);
  const toggle = () => {
    setDisabled(!disabled);
  };
 



  const [loader, setLoader] = useState("");
  const [errors, setErrors] = useState([]);
   const {id} = useParams()
  const onFinish = (data) => {
    
     let load  = {
      // withdraw:data.withdraw,
      customers:data.customers,
      id : id,
      on_market:`${formatFullYearOnly(data.marketVal)}-${formatMonthOnly(data.marketVal)}-${formatDayOnly(data.marketVal)}`,
      withdraw_date:`${formatFullYearOnly(data.withdraw_date)}-${formatMonthOnly(data.withdraw_date)}-${formatDayOnly(data.withdraw_date)}`
     }
     debugger
    // let payload = { "object": load }

    makeRequest(setLoader, updateSubstance, load, onSuccess, onError);
  };

  const onSuccess = (data, res) => {
    notify("Substance", res.msg);
  };

  const onError = (err) => {
    
    notify("Server Error")
    let errorList = [];
    errorList["password"] = err;
    setErrors(errorList);
  };
  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };

  return (
    <Form
      layout="vertical"
      // labelCol={{ span: 7 }}
      name="Details"
      initialValues={props?.data}
      onFinish={onFinish}
    >
      <Row gutter={[16, 24]}>
        <Col xs={24} md={24}>
          <h5>Product Details</h5>
        </Col>

        <Col className="gutter-row" xs={24} md={12} lg={12}>
          <Form.Item
            name="marketVal"
          
            label="Product Available for purchase from Date :"
           
          >
            <DatePicker   />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} lg={12}>
          <Form.Item name="customers" label="Customer :">
            <Select
              showSearch
              placeholder="Customer   "
              options={props?.dependencies.customers}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 24]}>
        <Col xs={24} md={24}>
          <h5>Product Withdrawn Status</h5>
        </Col>

        <Col className="gutter-row" xs={24} lg={12}>
          <Form.Item
            name="withdraw"
            label="This product is withdrawan from selling :"
            className="da-mb-16"
          >
            <Switch   onChange={toggle} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} lg={12}>
        <Form.Item
            name="withdraw_date"
          
            label="Product Available for purchase from Date :"
           
          >
            <DatePicker disabled={disabled} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12} className="productDetails">
          <p>
            {" "}
            <strong>
              <WarningOutlined />
            </strong>
            This Product is invalid or contains invalid or missing elements
          </p>
          <p>
            {" "}
            <strong>
              <WarningOutlined />
            </strong>
            This Product hase invalid recipe
          </p>
          <p>
            {" "}
            <strong>
              <WarningOutlined />
            </strong>
            Product Recipe is incomplete Missing 10%
          </p>
          <p>
            {" "}
            <strong>
              <WarningOutlined />
            </strong>
            Product Weight is invalid (0mg to 10mg)
          </p>
          <p>
            {" "}
            <strong>
              <WarningOutlined />
            </strong>
            This required Minimum one emission test
          </p>
        </Col>
      </Row>

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
    </Form>
  );
};

export default ProductDetails;

const rules = {
  name: [
    { required: true, message: "Please input your password!" },
    { min: 3, message: "Minimum password length is 3" },
    { max: 100, message: "Maximum password length is 100" },
  ],
  role_id: [{ required: true, message: "Please select user role!" }],
  company_id: [{ required: true, message: "Please select user third party!" }],
};
