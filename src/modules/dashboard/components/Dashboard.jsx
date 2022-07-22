import { CChart } from '@coreui/react-chartjs';
import { makeRequest } from "@utils/helpers";
import { Col, Row, Switch } from "antd";
import React, { useEffect, useState } from "react";
import AnalyticsProjectTableCard from './analytics/analyticsProjectTableCard';
import AnalyticsRevenueRadarCard from './analytics/analyticsRevenueRadarCard';
import AnalyticsVisitersLineCard from './analytics/analyticsVisitersLineCard';
import ExpensesCard from './analytics/expensesCard';
import { getDashbordData } from './requests';
import ActiveUserCardVertical from './statistics/activeUserCardVertical';
// import BestTeamCard from './statistics/bestTeamCard';
import CustomerSupportCardVertical from './statistics/customerSupportCardVertical';
import OrderColumnCardVertical from './statistics/orderColumnCardVertical';
import SubsColumnCardVertical from './statistics/subsColumnCardVertical';

const Dashboard = () => {
  // let lablesData = []
  const [disabled, setDisabled] = useState(true);
  const [lablesData, setLablesData] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [loader, setLoader] = useState(false);

  const toggle = () => {
    setDisabled(!disabled);
  };
  useEffect(() => {
    getData()
  }, [])
  const getData = () => {
    let payload = {}
    makeRequest(setLoader, getDashbordData, payload, onSuccess, null);

  }
  const onSuccess = (response) => {
    let lables = []
    let data = []
    response.forEach(element => {
      data.push(element.value);
      lables.push(element.month)

    });
    setLablesData(lables)
    setDataSource(data)
  }


  return (
    <Row gutter={[32, 0]} className="da-px-36 da-pt-24" >
    <Col  span={24}>
      <h3>Welcome back, Edward 👋</h3>

      
    </Col>

    <Row justify='space-around' align='center' >
      <Col span={15}  >
          <Row gutter={[32, 32]}>
           

            <Col span={24}>
              <AnalyticsVisitersLineCard />
            </Col>

            <Col md={6} span={12} className="dashbord-cards">
            <ActiveUserCardVertical />
            </Col>

            <Col md={6} span={12} className="dashbord-cards">
              <ActiveUserCardVertical />
            </Col>

            <Col md={6} span={12} className="dashbord-cards">
            <ActiveUserCardVertical />
            </Col>

            <Col md={6} span={12} className="dashbord-cards">
            <ActiveUserCardVertical />
            </Col>

            <Col span={24}>
              {/* <BestTeamCard /> */}
            </Col>

            <Col span={24}>
              {/* <EarningsCard /> */}
            </Col>

           
          </Row>

      
      </Col>
      <Col span={8}>
            <Col span={24}>
              <ExpensesCard />
            </Col>

          

            <Col span={24}>
              {/* <AnalyticsRevenueRadarCard /> */}
            </Col>
        </Col>
        <Col span={24}>
              <AnalyticsProjectTableCard />
        </Col>
    </Row>
  </Row>
  )
}
export default Dashboard;