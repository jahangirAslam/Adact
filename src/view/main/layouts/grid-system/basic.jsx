import React from "react";

import { Card, Row, Col } from "antd";

export default function BasicGrid() {
  return (
    <Card className="da-border-color-black-40">
      <Row>
        <Col className="da-mb-16" span={24}>
          <h4>Basic Grid</h4>

          <p className="da-p1-body">
            You can create a basic grid system by using a single set of Row and
            Col grid assembly, all of the columns (Col) must be placed in Row.
          </p>
        </Col>

        <Col span={24}>
          <Row>
            <Col
              className="da-p-16 da-text-center da-text-color-black-0 da-bg-primary-1 da-mb-8"
              span={24}
            >
              Col
            </Col>
          </Row>

          <Row>
            <Col
              className="da-p-16 da-text-center da-text-color-black-0 da-bg-primary-1 da-mb-8"
              span={12}
            >
              Col-12
            </Col>

            <Col
              className="da-p-16 da-text-center da-text-color-black-0 da-bg-primary-2 da-mb-8"
              span={12}
            >
              Col-12
            </Col>
          </Row>

          <Row>
            <Col
              className="da-p-16 da-text-center da-text-color-black-0 da-bg-primary-1 da-mb-8"
              span={8}
            >
              Col-8
            </Col>

            <Col
              className="da-p-16 da-text-center da-text-color-black-0 da-bg-primary-2 da-mb-8"
              span={8}
            >
              Col-8
            </Col>

            <Col
              className="da-p-16 da-text-center da-text-color-black-0 da-bg-primary-1 da-mb-8"
              span={8}
            >
              Col-8
            </Col>
          </Row>

          <Row>
            <Col
              className="da-p-16 da-text-center da-text-color-black-0 da-bg-primary-1 da-mb-8"
              span={6}
            >
              Col-6
            </Col>

            <Col
              className="da-p-16 da-text-center da-text-color-black-0 da-bg-primary-2 da-mb-8"
              span={6}
            >
              Col-6
            </Col>

            <Col
              className="da-p-16 da-text-center da-text-color-black-0 da-bg-primary-1 da-mb-8"
              span={6}
            >
              Col-6
            </Col>

            <Col
              className="da-p-16 da-text-center da-text-color-black-0 da-bg-primary-2 da-mb-8"
              span={6}
            >
              Col-6
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
