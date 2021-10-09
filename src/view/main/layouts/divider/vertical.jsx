import React from "react";

import { Card, Row, Col, Divider } from "antd";

export default function VerticalDivider() {
  return (
    <Card className="da-border-color-black-40">
      <Row>
        <Col className="da-mb-16" span={24}>
          <h4>Vertical</h4>

          <p className="da-p1-body">Use type="vertical" make it vertical.</p>
        </Col>

        <Col span={24}>
          Text
          
          <Divider type="vertical" />

          <a href="#">Link</a>

          <Divider type="vertical" />

          <a href="#">Link</a>
        </Col>
      </Row>
    </Card>
  );
}
