import React from "react";
import { Breadcrumb, Col, Row } from "antd";
import BaseTitle from "./BaseTitle";


const BaseHeader = (props) => {

  let params = { ...props };

  delete params.children;
  params.extra = props.children;

  const Bread = () => (
    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Next</Breadcrumb.Item>
    </Breadcrumb>
  )

  return (
    <>
      <Row gutter={[32, 8]} className="da-mb-32">
        <Col span={24}>
          <BaseTitle
            pageTitle="Users Crud"
            pageText="Create Read Update Delete"
          />
        </Col>
        <Col span={24}>
          <Row gutter={[32, 8]}>
            <Col span={16}>
              <Bread/>
            </Col>
              <Col span={8}>
                {params.extra}
              </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default BaseHeader;
