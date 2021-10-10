import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { Row, Col, Button, Modal, Divider } from "antd";
import { RiCheckboxCircleFill } from "react-icons/ri";

export default function Summary(props) {
  const { content, totalItem, totalPrice, stepUrl } = props

  const summaryOtherPrice = {
    delivery: 0,
    tax: 7.80,
    insurance: 1,
  }

  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Col lg={6} span={24}>
      <div className="da-p-24 da-border-radius da-border-1 da-border-color-black-40 da-bg-color-black-0">
        <h3 className="da-mb-0 da-text-color-black-80">Summary</h3>
        <span className="da-p1-body da-d-block da-text-color-black-60 da-font-weight-600">
          {totalItem} Product
        </span>

        <p className="da-mt-16 da-mb-0 da-p1-body da-text-color-black-80">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        {
          content && (
            <>
              <Divider className="da-my-16" />

              <h4 className="da-mb-8 da-mt-16 da-text-color-black-80">Edward Yıldırım</h4>

              <p className="da-mb-12 da-badge-text da-font-weight-400 da-text-color-black-60">
                70  Thompsons Lane / MELDON NE61 2YD
              </p>

              <a href="mailto:edward@example.com" className="da-transition da-hover-text-color-primary-1 da-d-block da-mb-12 da-badge-text da-font-weight-400 da-text-color-black-60">
                edward@example.com
              </a>

              <a href="tel:07877856649" className="da-transition da-hover-text-color-primary-1 da-d-block da-badge-text da-font-weight-400 da-text-color-black-60">
                078 7785 6649
              </a>

              <Divider className="da-my-16" />
            </>
          )
        }

        <Row className="da-mt-8">
          <Col span={24} className="da-mt-8">
            <Row align="middle" justify="space-between">
              <Col span={12} className="da-input-description da-text-color-black-80">Suptotal</Col>
              <Col span={12} className="da-text-right da-p1-body da-font-weight-700 da-text-color-primary-1">
                ${totalPrice}
              </Col>
            </Row>
          </Col>

          <Col span={24} className="da-mt-8">
            <Row align="middle" justify="space-between">
              <Col span={12} className="da-input-description da-text-color-black-80">Delivery</Col>
              <Col span={12} className="da-text-right da-p1-body da-font-weight-700 da-text-color-primary-1">
                {
                  summaryOtherPrice.delivery === 0 ? (
                    <>Free</>
                  ) : (
                    <>
                      ${summaryOtherPrice.delivery}
                    </>
                  )
                }
              </Col>
            </Row>
          </Col>

          <Col span={24} className="da-mt-8">
            <Row align="middle" justify="space-between">
              <Col span={12} className="da-input-description da-text-color-black-80">Tax</Col>
              <Col span={12} className="da-text-right da-p1-body da-font-weight-700 da-text-color-primary-1">
                {
                  summaryOtherPrice.tax === 0 ? (
                    <>Free</>
                  ) : (
                    <>
                      ${summaryOtherPrice.tax}
                    </>
                  )
                }
              </Col>
            </Row>
          </Col>

          <Col span={24} className="da-mt-8">
            <Row align="middle" justify="space-between">
              <Col span={12} className="da-input-description da-text-color-black-80">Insurance</Col>
              <Col span={12} className="da-text-right da-p1-body da-font-weight-700 da-text-color-primary-1">
                {
                  summaryOtherPrice.insurance === 0 ? (
                    <>Free</>
                  ) : (
                    <>
                      ${summaryOtherPrice.insurance}
                    </>
                  )
                }
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="da-mt-16">
          <Col span={24}>
            <Row align="middle" justify="space-between">
              <Col span={12} className="h5 da-font-weight-700 da-text-color-primary-1">Total</Col>
              <Col span={12} className="h5 da-text-right da-p1-body da-font-weight-700 da-text-color-primary-1">
                ${
                  totalPrice +
                  summaryOtherPrice.delivery +
                  summaryOtherPrice.tax +
                  summaryOtherPrice.insurance
                }
              </Col>
            </Row>
          </Col>

          <Col span={24} className="da-mt-24">
            {
              stepUrl ? (
                <Button type="primary" block>
                  <Link to={stepUrl}>Next Step</Link>
                </Button>
              ) : (
                <>
                  <Button
                    type="primary"
                    block
                    onClick={showModal}
                  >
                    Next Step
                  </Button>

                  <Modal
                    title={null}
                    width={416}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                    closable={false}
                    centered
                  >
                    <div className="da-text-center">
                      <div className="da-mb-8">
                        <RiCheckboxCircleFill className="da-text-color-success-1" size={86} />
                      </div>

                      <span className="h1 da-d-block da-mb-8">Success</span>

                      <p className="da-mb-0 da-p2-body da-font-weight-700 da-text-color-black-80">
                        Payment received successfully
                      </p>
                    </div>
                  </Modal>
                </>
              )
            }
          </Col>
        </Row>
      </div>
    </Col>
  )
}