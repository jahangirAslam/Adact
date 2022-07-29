import { makeRequest } from "@utils/helpers";
import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import AnalyticsProjectTableCard from "./analytics/analyticsProjectTableCard";
import AnalyticsVisitersLineCard from "./analytics/analyticsVisitersLineCard";
import ExpensesCard from "./analytics/expensesCard";
import { getDashbordData } from "./requests";
import ActiveUserCardVertical from "./statistics/activeUserCardVertical";
// import BestTeamCard from './statistics/bestTeamCard';
import CustomerSupportCardVertical from "./statistics/customerSupportCardVertical";
import OrderColumnCardVertical from "./statistics/orderColumnCardVertical";
import SubsColumnCardVertical from "./statistics/subsColumnCardVertical";

const Dashboard = () => {
  // let lablesData = []
  const [disabled, setDisabled] = useState(true);
  const [lablesData, setLablesData] = useState([]);
  const [dataSource, setDataSource] = useState({});
  const [loader, setLoader] = useState(false);

  const toggle = () => {
    setDisabled(!disabled);
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    let payload = {};
    makeRequest(setLoader, getDashbordData, payload, onSuccess, null);
  };
  const onSuccess = (response) => {
    // let lables = [];
    // let data = [];
    // response.forEach((element) => {
    //   data.push(element.value);
    //   lables.push(element.month);
    // });
    // setLablesData(lables);

    setDataSource(response);

  };

  return (
    <Row gutter={[32, 0]} className="da-px-36">
      <Col span={24} className="dashboardHeaders">
        <h3>Welcome back 👋</h3>
      </Col>

      <Row justify="" align="center">
        <Col span={16} xs={24} md={16}>
          <AnalyticsVisitersLineCard />
        </Col>
        <Col span={8} xs={24} md={8}  className="da-px-10" >
          <ExpensesCard />
        </Col>
        <Col span={24}>
          <Row justify="space-around" className="da-pb-24" >
            <Col md={4} span={12} className="dashbord-cards">
              <OrderColumnCardVertical dataSource={dataSource} />
            </Col>

            <Col md={4} span={12} className="dashbord-cards">
              <ActiveUserCardVertical dataSource={dataSource} />
            </Col>

            <Col md={4} span={12} className="dashbord-cards">
              <SubsColumnCardVertical dataSource={dataSource} />
            </Col>

            <Col md={4} span={12} className="dashbord-cards">
              <CustomerSupportCardVertical dataSource={dataSource} />
            </Col>
          </Row>
        </Col>





        <Col span={24}>
          <AnalyticsProjectTableCard dataSource={dataSource} />
        </Col>
      </Row>
    </Row>
  );
};
export default Dashboard;
