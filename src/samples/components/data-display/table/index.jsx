import React from "react";

import { Row, Col } from "antd";

import Breadcrumbs from "../../../../layout/components/content/breadcrumbs";
import PageTitle from "../../../../layout/components/content/page-title";
import BasicTable from "./basic";
import TableSelection from "./selection";
import TableSizes from "./tableSizes";

export default function Table() {
  return (
    <Row justify="center">
      <Col xl={18}>
        <Row gutter={[32, 32]} className="da-mb-32">
          <Col span={24}>
            <Row gutter={[32, 32]}>
              <Breadcrumbs
                breadCrumbParent="Components"
                breadCrumbParent2="Data Display"
                breadCrumbActive="Table"
              />

              <PageTitle
                pageTitle="Table"
                pageText="A table displays rows of data."
              />
            </Row>
          </Col>

          <Col span={24}>
            <BasicTable />
          </Col>

          <Col span={24}>
            <TableSelection />
          </Col>

          <Col span={24}>
            <TableSizes />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
