import React from "react";

import { Card, Row, Col, Divider } from "antd";

export default function HorizontalDivider() {
  return (
    <Card className="da-border-color-black-40">
      <Row>
        <Col className="da-mb-16" span={24}>
          <h4>Horizontal</h4>

          <p className="da-p1-body">
            Divider is horizontal by default. You can add text within Divider.
          </p>
        </Col>

        <Col span={24}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
            merninisti licere mihi ista probare, quae sunt a te dicta? Refert
            tamen, quo modo.
          </p>
          
          <Divider />
          
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
            merninisti licere mihi ista probare, quae sunt a te dicta? Refert
            tamen, quo modo.
          </p>
          
          <Divider dashed />
          
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
            merninisti licere mihi ista probare, quae sunt a te dicta? Refert
            tamen, quo modo.
          </p>
        </Col>
      </Row>
    </Card>
  );
}
