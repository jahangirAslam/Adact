import { ButtonComponent } from "@comps/components";
import { getErrorProps, makeRequest, notify } from "@utils/helpers";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Switch,
  Typography,
} from "antd";
import React, { useState } from "react";
import MyCamera from "./MyCamera";
import MyPrinters from "./MyPrinters";
// import { updateSubstance } from "../request";

const MyDevices = (props) => {
  const { Title } = Typography;
  const [loader, setLoader] = useState("");
  const [errors, setErrors] = useState([]);
  // for Active Tabs
  const [triggerTable, settRiggerTable] = useState("printers");

  const activeTab = (check) => {
    settRiggerTable(check);
    
  }

  const onFinish = (payload) => {
    payload.id = props.data.id;
    // makeRequest(setLoader, updateSubstance, payload, onSuccess, onError);
  };

  const onSuccess = (data, res) => {
    notify("Substance", res.msg);
  };

  const onError = (err) => {
    let errorList = [];
    errorList["password"] = err;
    setErrors(errorList);
  };


  return (
    <div>
      <Row>
        <Col className="printersBtn" span={24}>
          <Button className="devicesBtn"  onClick={() => activeTab("printers")}>
            My Printers
          </Button>
          <Button className="devicesBtn"  onClick={() => activeTab("cameras")}>
            My Cameras
          </Button>
        </Col>

        <Divider></Divider>
  
      </Row>
      {/* Table */}
      {triggerTable === "printers" ? <MyPrinters/> : ""}
      {triggerTable === "cameras" ? <MyCamera/> : ""}
      
      

      
    </div>
  );
};

export default MyDevices;

const rules = {
  name: [
    { required: true, message: "Please input your password!" },
    { min: 3, message: "Minimum password length is 3" },
    { max: 100, message: "Maximum password length is 100" },
  ],
  role_id: [{ required: true, message: "Please select user role!" }],
  company_id: [{ required: true, message: "Please select user third party!" }],
};
