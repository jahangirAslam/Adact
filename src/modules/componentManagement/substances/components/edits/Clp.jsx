import { ButtonComponent } from "@comps/components";
import { makeRequest, notify } from "@utils/helpers";
import {
  Col,
  Divider, Form,
  Input,
  Row, Select, Switch, Typography
} from "antd";
import React, { useState } from "react";
import { updateSubstance } from "../../requests";

const Clp = (props) => {
  const { Title } = Typography;
  const [loader, setLoader] = useState("");
  // const [errors, setErrors] = useState([]);

  const onFinish = (payload) => {
    payload.id = props.data.id;
    makeRequest(setLoader, updateSubstance, payload, onSuccess);
  };

  const onSuccess = (data, res) => {
    notify("Substance", res.msg);
  };

  return (
    <Form
      layout="vertical"
      // labelCol={{ span: 12 }}
      initialValues={props.data}
      onFinish={onFinish}
      className="inner-form-heading"
    >
      <Row gutter={[16, 24]}>
        <Col className=" gutter-row" span={24}>
          <Title level={4}>CLP</Title>
        </Col>
        <Col className="gutter-row" xs={24} md={12}  >
          <Form.Item
            name="Clp_Whether_Classification"
            label="CLP whether classification :"
            className="da-mb-16"
          >
            <Select
              showSearch
              placeholder="Select"
            //    options={dep.Clp_Whether_Classification}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="Clp_Dermal"
            label="CLP DErmal :"
            className="da-mb-16"
          >
            <Select
              showSearch
              placeholder="Harmonised classification"
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="Clp_Oral"
            label="CLP Oral:"
            className="da-mb-16"
          >
            <Select
              showSearch
              placeholder="Select"
              options={[
                { label: "Solid", value: "solid" },
                { label: "Powder", value: "powder" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12}  >
          <Form.Item
            name="substanceCanonicalized"
            label="CLP Corresive/irretent"
            className="da-mb-16"
          >
            <Select
              showSearch
              placeholder="Select"
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12}  >
          <Form.Item
            name="Clp_Inhalation"
            label="CLP Inhalation"
            className="da-mb-16"
          >
            <Select
              showSearch
              placeholder="Select"
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12}  >
          <Form.Item
            name="Clp_Respiratory_Sensitisation"
            label="CLP Respiratory/ Sensitisation"
            className="da-mb-16"
          >
            <Select
              showSearch
              placeholder="Select"
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12}  >
          <Form.Item
            name="Clp_Eye"
            label="CLP Eye"
            className="da-mb-16"
          >
            <Select
              showSearch
              placeholder="Select"
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12}  >
          <Form.Item
            name="Clp_Mutagen_Genotox"
            label="CLP Mutagen Genotox"
            className="da-mb-16"
          >
            <Select
              showSearch
              placeholder="Select"
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12}  >
          <Form.Item
            name="Clp_Skin_Sensitisation"
            label="CLP Skin Sensitisation"
            className="da-mb-16"
          >
            <Select
              showSearch
              placeholder="Select"
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12}  >
          <Form.Item
            name="Clp_Reproductive_Tox"
            label="CLP Reprodective Tox"
            className="da-mb-16"
          >
            <Select
              showSearch
              placeholder="Select"
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12}  >
          <Form.Item
            name="Clp_Carcinogenity"
            label="CLP Cercinogenity"
            className="da-mb-16"
          >
            <Select
              showSearch
              placeholder="Select"
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12}  >
          <Form.Item
            name="Clp_Ingredient_Toxicity"
            label="CLP Incredient Toxicity"
            className="da-mb-16"
          >
            <Select
              showSearch
              placeholder="Select"
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12}  >
          <Form.Item
            name="Clp_Stot"
            label="CLP Stot"
            className="da-mb-16"
          >
            <Select
              showSearch
              placeholder="Select"
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />
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

export default Clp;

// const rules = {
//   name: [
//     { required: true, message: "Please input your password!" },
//     { min: 3, message: "Minimum password length is 3" },
//     { max: 100, message: "Maximum password length is 100" },
//   ],
//   role_id: [{ required: true, message: "Please select user role!" }],
//   company_id: [{ required: true, message: "Please select user third party!" }],
// };
