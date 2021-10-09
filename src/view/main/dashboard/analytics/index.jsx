import React from "react";

import { Row, Col } from "antd";

import UpgradePlanCardOneBg from "../../widgets/cards/advance/upgradePlanCardOneBg";
import OrderColumnCardVertical from "../../widgets/cards/statistics/orderColumnCardVertical";
import ActiveUserCardVertical from "../../widgets/cards/statistics/activeUserCardVertical";
import SubsColumnCardVertical from "../../widgets/cards/statistics/subsColumnCardVertical";
import CustomerSupportCardVertical from "../../widgets/cards/statistics/customerSupportCardVertical";
import DownloadCard from "../../widgets/cards/advance/downloadCard";
import EarningsCard from "../../widgets/cards/advance/earningsCard";
import BestTeamCard from "../../widgets/cards/statistics/bestTeamCard";
import ExpensesCard from "./expensesCard";
import AnalyticsProjectTableCard from "./analyticsProjectTableCard";
import AnalyticsVisitersLineCard from "./analyticsVisitersLineCard";
import AnalyticsRevenueRadarCard from "./analyticsRevenueRadarCard";

export default function Analytics() {
  return (
    <Row gutter={[32, 0]}>
      <Col span={24}>
        <h3>Welcome back, Edward 👋</h3>

        <p className="da-p1-body da-text-color-black-100 da-mb-0">
          Your current status and analytics are here
        </p>
      </Col>

      <Col span={24} className="da-mt-32">
        <Row gutter={[32, 0]}>
          <Col flex="1" className="da-overflow-hidden">
            <Row gutter={[32, 32]}>
              <Col span={24}>
                <UpgradePlanCardOneBg />
              </Col>

              <Col span={24}>
                <AnalyticsVisitersLineCard />
              </Col>

              <Col md={6} span={12} className="da-overflow-hidden">
                <OrderColumnCardVertical />
              </Col>

              <Col md={6} span={12} className="da-overflow-hidden">
                <ActiveUserCardVertical />
              </Col>

              <Col md={6} span={12} className="da-overflow-hidden">
                <SubsColumnCardVertical />
              </Col>

              <Col md={6} span={12} className="da-overflow-hidden">
                <CustomerSupportCardVertical />
              </Col>

              <Col span={24}>
                <BestTeamCard />
              </Col>

              <Col span={24}>
                <EarningsCard />
              </Col>

              <Col span={24}>
                <AnalyticsProjectTableCard />
              </Col>
            </Row>
          </Col>

          <Col className="da-analytics-col-2">
            <ExpensesCard />

            <DownloadCard />

            <AnalyticsRevenueRadarCard />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
