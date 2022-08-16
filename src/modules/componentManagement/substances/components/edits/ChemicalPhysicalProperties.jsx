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

const ChemicalPhysicalProperties = (props) => {
  
  const { Title } = Typography;
  
  const [loader, setLoader] = useState("");
  // const [errors, setErrors] = useState([]);

  const onFinish = (payload) => {
    payload.id = props.data.id;
    makeRequest(setLoader, updateSubstance, payload, onSuccess, onError);
  };

  const onSuccess = (data, res) => {
    notify("Substance Properties", res.msg);
  };

  const onError = (err) => {
    notify("Product Created",);
  
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
          <Title level={4}>Chemical and Physical Properties</Title>
        </Col>
        <Col className="gutter-row" xs={24} md={12}  >
          <Form.Item
            name="state_of_matter"
            label="State of matter :"
            className="da-mb-16"
          >
            <Select
              showSearch
              placeholder="State of matter"
              options={[
                { label: "Solid", value: "solid" },
                { label: "Liquid", value: "liquid" },
                { label: "Gas", value: "gas" },
                { label: "Plasma", value: "plasma" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="harmonised_classification"
            label="Harmonised classification :"
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
            name="consistency"
            label="Consistency:"
            className="da-mb-16"
          >
            <Select
              showSearch
              placeholder="Consistency"
              options={[
                { label: "Solid", value: "solid" },
                { label: "Powder", value: "powder" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24}  >
          <Form.Item
            name="canonicalized"
            label="Canonicalized"
            className="da-mb-16"
          >
            <Select
              showSearch
              placeholder="Canonicalized"
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="left" />
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={24}>
          <Title level={4}>Mass,weight,Density</Title>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="density"
            label="Density (g/cm3) :"
            className="da-mb-16"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="mass"
            label="Mass (g/mol) :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="molecular_weight"
            label="Molecular weight (g/mol) :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="vapor_density"
            label="Vapor Density (Relative to Air) :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="monoisotopic_mass"
            label="Monoisotopic mass (g/mol) :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="molar_volume"
            label="Molar volume :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="left" />
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={24}>
          <Title level={4}>Properties</Title>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="partition_coefficient"
            label="Partition coefficient :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="Rotatable_bond_count"
            label="Rotatable Bond Count :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="formal_charge"
            label="Formal Charge :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="hydrogen_bond_donor"
            label="Hydrogen Bond Donor Count :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="surface_area"
            label="Surface area :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="complexity"
            label="Complexity :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="hydrogen_bond_acceptor"
            label="Hydrogen Bond Acceptor Count :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="heavy_atom_count"
            label="Heavy Atom Count :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="left" />
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" xs={8}>
          <Form.Item
            name="is_safe"
            label="Ingredient unsafe to use? :"
            className="da-mb-16"
          >
            <Switch defaultChecked={props.data.is_safe} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={8}>
          <Form.Item name="status" label="Status :" className="da-mb-16">
            <Switch defaultChecked={props.data.status} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={8}>
          <Form.Item name="is_test" label="Test Mode :" className="da-mb-16">
            <Switch defaultChecked={props.data.is_test} />
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

export default ChemicalPhysicalProperties;

// const rules = {
//   name: [
//     { required: true, message: "Please input your password!" },
//     { min: 3, message: "Minimum password length is 3" },
//     { max: 100, message: "Maximum password length is 100" },
//   ],
//   role_id: [{ required: true, message: "Please select user role!" }],
//   company_id: [{ required: true, message: "Please select user third party!" }],
// };
