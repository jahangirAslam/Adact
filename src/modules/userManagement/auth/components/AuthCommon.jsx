import { Col, Row } from "antd";

const AuthCommon = () => (
  <Col lg={12} span={24} className="da-bg-color-primary-4 da-position-relative">
    <Row className="da-image-row da-h-100 da-px-sm-8 da-px-md-16 da-pb-sm-32 da-pt-md-96 da-pt-md-32">
      <Col className="da-logo-item da-m-sm-16 da-m-md-32 da-m-64">
      </Col>

      <Col span={24}>
        <Row align="middle" justify="center" className="da-h-100">
          <Col md={20} span={24} className="da-bg-item da-text-center da-mb-md-32">
          </Col>

          <Col xl={18} span={24} className="da-text-item da-text-center">
            <h2 className="da-text-color-primary-1 da-mx-lg-16 da-mb-16">Very good works are  waiting for you 🤞</h2>

            <p className="da-mb-0 da-text-color-black-80">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  </Col>
);

export default AuthCommon;
