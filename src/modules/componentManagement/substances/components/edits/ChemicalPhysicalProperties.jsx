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
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="isotope_atom_count"
            label="Isotops Atom Count :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="undefined_bond_stereocenter_count"
            label="Undefined Bond Stereocenter Count :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="henrys_law"
            label="Henry's Law :"
            className="da-mb-16"
          >
            <Input  />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="ionization_porential"
            label="ionization porential :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="undefined_atom_stereocenter_count"
            label="Undefined Atom Stereocenter Count :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="covalently_bonded_unit"
            label="Covalently-Bonded Unit Count :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="xlog_kkoa"
            label="XLOG KKOA :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="idlh"
            label="IDLH :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        {/*  */}
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="defined_bond_stereocenter_count"
            label="defined Bond  Stereocenter Count :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="viscosity"
            label="Viscosity  :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="x_logp"
            label="XLOG P3:"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="surface_tension"
            label="Surface tension:"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>

        {/*  */}

        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="index_refraction"
            label="Index Of Refrection :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="thermal_conductivity"
            label="Thermal Conductivity  :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="autoignition_temperature"
            label="Autogenation Temperature:"
            className="da-mb-16"
          >
            <Input  />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="vapor_pressure"
            label="Vapor Pressure:"
            className="da-mb-16"
          >
            <Input  />
          </Form.Item>
        </Col>
        {/*  */}
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="molar_refractivity"
            label="Molar Refractivity :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="explosive_limit_lower"
            label="Explosive Limit (Lower)  :"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="cnf_ingredient"
            label="CNF_Ingredient_cap_Vapor_pressure_temperature:"
            className="da-mb-16"
          >
            <Input  />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="polarizability"
            label="Polarize Ability:"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="explosive_limit_upper"
            label="Explosive Limit (Upper):"
            className="da-mb-16"
          >
            <Input type="number" />
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="left" />
      
      {/*  */}
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" xs={6}>
          <Form.Item
            name="specific_gravity"
            className="da-mb-16"
          >
              <h5>Specific Gravity</h5>
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={6}>
          <Form.Item
            name="specific_gravity"
            className="da-mb-16"
          >
              <h5>Water Sulubility</h5>
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={6}>
          <Form.Item
            name="specific_gravity"
            className="da-mb-16"
          >
              <h5>Melting Points</h5>
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={6}>
          <Form.Item
            name="specific_gravity"
            className="da-mb-16"
          >
              <h5>Flash Point</h5>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" xs={6}>
          
        </Col>
        <Col className="gutter-row" xs={6}>
        </Col>
        <Col className="gutter-row" xs={6}>
          <Form.Item
            name="melting_point_c"
            className="da-mb-16"
            label="°C"
          >
              <Input/>  
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={6}>
          <Form.Item
            name="melting_point_c"
            className="da-mb-16"
            label="°C"
          >
               <Input/>  
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" xs={6}>
          
        </Col>
        <Col className="gutter-row" xs={6}>
        </Col>
        <Col className="gutter-row" xs={6}>
          <Form.Item
            name="melting_point_f"
            className="da-mb-16"
            label="°F"
          >
              <Input/>  
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={6}>
          <Form.Item
            name="melting_point_f"
            className="da-mb-16"
            label="°F"
          >
               <Input/>  
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" xs={6}>
          
        </Col>
        <Col className="gutter-row" xs={6}>
        </Col>
        <Col className="gutter-row" xs={6}>
          <Form.Item
            name="melting_point_mm"
            className="da-mb-16"
            label="mm"
          >
              <Input/>  
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={6}>
          <Form.Item
            name="melting_point_mm"
            className="da-mb-16"
            label="mm"
          >
               <Input/>  
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 24]}>
       <Col xs={24}>
        <h5>NFPA 704</h5>
       </Col>
      <Col className="gutter-row" xs={12}>
          <Form.Item
            name="nfpa_health"
            className="da-mb-16"
            label="Health"
          >
              <Input/>  
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={12}>
          <Form.Item
            name="nfpa_instability"
            className="da-mb-16"
            label="Instability"
          >
               <Input/>  
          </Form.Item>
        </Col>
        
      </Row>
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" xs={12}>
          <Form.Item
            name="nfpa_flammability"
            className="da-mb-16"
            label="Flammability"
          >
              <Input/>  
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={12}>
          <Form.Item
            name="nfpa_special"
            className="da-mb-16"
            label="Special"
          >
               <Input/>  
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
