import React from "react";

import { Card, Row, Col, Divider } from "antd";

export default function DividerWithoutHedingStyle() {
  return (
    <Card className="da-border-color-black-40">
      <Row>
        <Col className="da-mb-16" span={24}>
          <h4>Text without heading style</h4>

          <p className="da-p1-body">
            You can use non-heading style of divider text by setting plain.
          </p>
        </Col>

        <Col span={24}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
            merninisti licere mihi ista probare, quae sunt a te dicta? Refert
            tamen, quo modo.
          </p>

          <Divider plain>Text</Divider>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
            merninisti licere mihi ista probare, quae sunt a te dicta? Refert
            tamen, quo modo.
          </p>

          <Divider orientation="left" plain>
            Left Text
          </Divider>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
            merninisti licere mihi ista probare, quae sunt a te dicta? Refert
            tamen, quo modo.
          </p>

          <Divider orientation="right" plain>
            Right Text
          </Divider>

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
