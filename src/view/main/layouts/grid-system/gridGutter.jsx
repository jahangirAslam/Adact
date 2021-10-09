import React from "react";

import { Card, Row, Col, Divider } from "antd";

export default function GridGutter() {
  return (
    <Card className="da-border-color-black-40">
      <Row>
        <Col className="da-mb-16" span={24}>
          <h4>Grid Gutter</h4>
          
          <p className="da-p1-body da-mb-8">
            You can use the gutter property of Row as grid spacing, we recommend
            set it to (16 + 8n) px (n stands for natural number).
          </p>
          
          <p className="da-p1-body da-mb-8">
            You can set it to a object like xs: 8, sm: 16, md: 24, lg: 32 for
            responsive design.
          </p>
          
          <p className="da-p1-body">
            You can use a array to set vertical spacing, [horizontal, vertical]
            [16, &#123; xs: 8, sm: 16, md: 24, lg: 32 &#125;] .
          </p>
        </Col>

        <Col span={24}>
          <Divider orientation="left">Horizontal</Divider>

          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <div className="da-py-8 da-text-center da-text-color-black-0 da-bg-color-primary-1">
                col-6
              </div>
            </Col>

            <Col className="gutter-row" span={6}>
              <div className="da-py-8 da-text-center da-text-color-black-0 da-bg-color-primary-1">
                col-6
              </div>
            </Col>

            <Col className="gutter-row" span={6}>
              <div className="da-py-8 da-text-center da-text-color-black-0 da-bg-color-primary-1">
                col-6
              </div>
            </Col>

            <Col className="gutter-row" span={6}>
              <div className="da-py-8 da-text-center da-text-color-black-0 da-bg-color-primary-1">
                col-6
              </div>
            </Col>
          </Row>

          <Divider orientation="left">Responsive</Divider>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={6}>
              <div className="da-py-8 da-text-center da-text-color-black-0 da-bg-color-primary-1">
                col-6
              </div>
            </Col>
            
            <Col className="gutter-row" span={6}>
              <div className="da-py-8 da-text-center da-text-color-black-0 da-bg-color-primary-1">
                col-6
              </div>
            </Col>
            
            <Col className="gutter-row" span={6}>
              <div className="da-py-8 da-text-center da-text-color-black-0 da-bg-color-primary-1">
                col-6
              </div>
            </Col>
            
            <Col className="gutter-row" span={6}>
              <div className="da-py-8 da-text-center da-text-color-black-0 da-bg-color-primary-1">
                col-6
              </div>
            </Col>
          </Row>
          
          <Divider orientation="left">Vertical</Divider>
          
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={6}>
              <div className="da-py-8 da-text-center da-text-color-black-0 da-bg-color-primary-1">
                col-6
              </div>
            </Col>
            
            <Col className="gutter-row" span={6}>
              <div className="da-py-8 da-text-center da-text-color-black-0 da-bg-color-primary-1">
                col-6
              </div>
            </Col>
            
            <Col className="gutter-row" span={6}>
              <div className="da-py-8 da-text-center da-text-color-black-0 da-bg-color-primary-1">
                col-6
              </div>
            </Col>
            
            <Col className="gutter-row" span={6}>
              <div className="da-py-8 da-text-center da-text-color-black-0 da-bg-color-primary-1">
                col-6
              </div>
            </Col>
            
            <Col className="gutter-row" span={6}>
              <div className="da-py-8 da-text-center da-text-color-black-0 da-bg-color-primary-1">
                col-6
              </div>
            </Col>
            
            <Col className="gutter-row" span={6}>
              <div className="da-py-8 da-text-center da-text-color-black-0 da-bg-color-primary-1">
                col-6
              </div>
            </Col>
            
            <Col className="gutter-row" span={6}>
              <div className="da-py-8 da-text-center da-text-color-black-0 da-bg-color-primary-1">
                col-6
              </div>
            </Col>
            
            <Col className="gutter-row" span={6}>
              <div className="da-py-8 da-text-center da-text-color-black-0 da-bg-color-primary-1">
                col-6
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
