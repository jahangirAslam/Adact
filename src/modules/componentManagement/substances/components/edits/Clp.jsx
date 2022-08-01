import React, { useEffect, useState } from "react";
import { updateSubstance,getDependencies, getDependenciesClp } from "../../requests";
import { ButtonComponent } from "@comps/components";
import { makeRequest,makeRequestStateless, notify } from "@utils/helpers";
import {
  Col,
  Divider, Form,
  Input,
  Row, Select, Switch, Typography
} from "antd";
const { TextArea } = Input;
const Clp = (props) => {
  const [deps, setDeps] = useState({
    // countries: [],
    Clp_Whether_Classification:[],
    Clp_Oral:[],
    Clp_Inhalation:[],
    Clp_Eye:[],
    Clp_Skin_Sensitisation:[],
    Clp_Carcinogenity:[],
    Clp_Stot:[],
    Clp_Dermal:[],
    Clp_Corrosive:[],
    Clp_Respiratory_Sensitisation:[],
    Clp_Mutagen_Genotox:[],
    Clp_Reproductive_Tox:[],
    Clp_Ingredient_Toxicity:[],


    



});

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


  const getSelectFieldsData = () => {
    
    makeRequestStateless(getDependenciesClp, null, onDependencySuccess, null);
}

useEffect(() => {
    getSelectFieldsData();
    // eslint-disable-next-line
}, []);

const onDependencySuccess = (data, res) => {
  
    setDeps({

        Clp_Whether_Classification:data.Clp_Whether_Classification,
        Clp_Oral: data.Clp_Oral,
        Clp_Inhalation: data.Clp_Inhalation,
        Clp_Eye: data.Clp_Eye,
        Clp_Skin_Sensitisation: data.Clp_Skin_Sensitisation,
        Clp_Carcinogenity:data.Clp_Carcinogenity,
        Clp_Stot: data.Clp_Stot,
        Clp_Dermal: data.Clp_Dermal,
        Clp_Corrosive:data.Clp_Corrosive,
        Clp_Respiratory_Sensitisation:data.Clp_Respiratory_Sensitisation,
        Clp_Mutagen_Genotox:data.Clp_Mutagen_Genotox,
        Clp_Reproductive_Tox:data.Clp_Reproductive_Tox,
        Clp_Ingredient_Toxicity:data.Clp_Ingredient_Toxicity,
    
    });


}

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
                options={deps.Clp_Whether_Classification}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} >
          <Form.Item
            name="Clp_Dermal"
            label="CLP Dermal :"
            className="da-mb-16"
          >
            <Select
              showSearch
              placeholder="Harmonised classification"
              options={deps.Clp_Dermal}
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
              options={deps.Clp_Oral}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12}  >
          <Form.Item
            name="Clp_Corrosive"
            label="CLP Corresive/irretent"
            className="da-mb-16"
          >
            <Select
              showSearch
              placeholder="Select"
              options={deps.Clp_Corrosive}
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
              options={deps.Clp_Inhalation}
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
              options={deps.Clp_Respiratory_Sensitisation}
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
              options={deps.Clp_Eye}
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
              options={deps.Clp_Mutagen_Genotox}
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
              options={deps.Clp_Skin_Sensitisation}
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
              options={deps.Clp_Reproductive_Tox}
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
              options={deps.Clp_Carcinogenity}
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
              options={deps.Clp_Ingredient_Toxicity}
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
              options={deps.Clp_Stot}
            />
          </Form.Item>
        </Col>      
      </Row>
      <Row>
      <Col className="gutter-row" xs={24} md={12}  >
          <Form.Item
            name="description"
            label="Description"
            className="da-mb-16 discription"
          >
                <TextArea rows={200} placeholder="Add description Here" maxLength={2000} />
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
          Apply 
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
