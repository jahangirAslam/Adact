import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import MaskedInput from 'antd-mask-input'

import { Row, Col, Button, Form, Input, Steps, Tag, Collapse } from "antd";
import { RiBankCard2Line, RiHandCoinLine, RiWallet3Line, RiArrowRightSLine, RiCheckFill, RiFileCopyLine } from "react-icons/ri";

import BreadCrumbs from '../../../../layout/components/content/breadcrumbs';
import Summary from './Summary';

const { Panel } = Collapse;
const { Step } = Steps;

export default function Payment(props) {
  const { totalItem, totalPrice } = props

  const genExtra = () => (
    <RiArrowRightSLine
      size={24}
      className="da-collapse-arrow da-text-color-black-60"
    />
  );

  const [bankValue1, setBankValue1] = useState()
  const [bankValue2, setBankValue2] = useState()

  return (
    <Row className="da-ecommerce-app-checkout da-mb-32">
      <Col className="da-mb-32" span={24}>
        <Row gutter={[32, 32]}>
          <BreadCrumbs
            breadCrumbParent="Applications"
            breadCrumbParent2="E-Commerce"
            breadCrumbActive="Checkout"
          />
        </Row>
      </Col>

      <Col span={24}>
        <Row gutter={[32, 32]}>
          <Col lg={18} span={24}>
            <div className="da-p-24 da-border-radius da-border-1 da-border-color-black-40 da-bg-color-black-0 da-mb-32 da-overflow-scroll da-scrollbar-x-hidden">
              <Steps size="small" current={2}>
                <Step title={
                  <Link to="/apps/ecommerce/checkout">
                    <span className="da-text-color-black-80">Order Details</span>
                  </Link>

                } />
                <Step title={
                  <Link to="/apps/ecommerce/address-information">
                    <span className="da-text-color-black-80">Address Informations</span>
                  </Link>
                }
                />
                <Step title={
                  <Link to="/apps/ecommerce/payment">
                    <span className="da-text-color-black-100">Payment</span>
                  </Link>
                } />
              </Steps>
            </div>

            <div className="da-p-sm-16 da-p-24 da-border-radius da-border-1 da-border-color-black-40 da-bg-color-black-0">
              <h3 className="da-mb-4 da-text-color-black-80">Payment Options</h3>
              <p className="da-mb-24 da-p1-body da-text-color-black-60">Be sure to click on correct payment option</p>

              <Collapse accordion defaultActiveKey={1}>
                <Panel
                  header={
                    <p className="da-d-flex-center da-p1-body da-mb-0">
                      <RiBankCard2Line
                        size={24}
                        className="remix-icon da-text-color-primary-1 da-mr-18"
                      />

                      <span>Credit Card</span>

                      <Tag className="da-ml-16" color="green">
                        Tag
                      </Tag>
                    </p>
                  }
                  key="1"
                  showArrow={false}
                  extra={genExtra()}
                >
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <span className="da-font-weight-600 da-mb-8 da-d-block">Card Number:</span>
                      <MaskedInput mask="1111 1111 1111 1111" name="card" size="20" />
                    </Col>

                    <Col span={24}>
                      <span className="da-font-weight-600 da-mb-8 da-d-block">Name on card:</span>
                      <Input />
                    </Col>

                    <Col md={12} span={24}>
                      <span className="da-font-weight-600 da-mb-8 da-d-block">Expiration date (MM/YY):</span>
                      <MaskedInput mask="11/11" name="expiry" />
                    </Col>

                    <Col md={12} span={24}>
                      <span className="da-font-weight-600 da-mb-8 da-d-block">CVC:</span>
                      <MaskedInput mask="111" name="cvc" />
                    </Col>

                    <Col span={24} className="da-mt-16 da-text-right">
                      <Button
                        type="primary"
                        icon={
                          <RiCheckFill className="da-mr-8" />
                        }
                      >
                        Confirmed
                        </Button>
                    </Col>
                  </Row>
                </Panel>

                <Panel
                  header={
                    <p className="da-d-flex-center da-p1-body da-mb-0">
                      <RiHandCoinLine
                        size={24}
                        className="remix-icon da-text-color-primary-1 da-mr-18"
                      />

                      <span>Pay Cash on Delivery</span>
                    </p>
                  }
                  key="2"
                  showArrow={false}
                  extra={genExtra()}
                >
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <span className="da-font-weight-600 da-mb-8 da-d-block">A-BANK IBAN:</span>
                      <Input
                        onChange={(e) => setBankValue1(e.target.value)}
                        suffix={
                          <RiFileCopyLine
                            onClick={() => navigator.clipboard.writeText(bankValue1)}
                            className="da-transition da-hover-text-color-primary-3 da-cursor-pointer remix-icon da-text-color-primary-1"
                          />
                        } />
                    </Col>

                    <Col span={24}>
                      <span className="da-font-weight-600 da-mb-8 da-d-block">B-BANK IBAN:</span>
                      <Input
                        onChange={(e) => setBankValue2(e.target.value)}
                        suffix={
                          <RiFileCopyLine
                            onClick={() => navigator.clipboard.writeText(bankValue2)}
                            className="da-transition da-hover-text-color-primary-3 da-cursor-pointer remix-icon da-text-color-primary-1"
                          />
                        } />
                    </Col>

                    <Col span={24}>
                      <p className="da-badge-text da-font-weight-600 da-text-color-primary-1">Please  enter your username on description area .</p>
                    </Col>
                  </Row>
                </Panel>

                <Panel
                  header={
                    <p className="da-d-flex-center da-p1-body da-mb-0">
                      <RiWallet3Line
                        size={24}
                        className="remix-icon da-text-color-primary-1 da-mr-18"
                      />

                      <span>Shopping Credit</span>

                      <Tag className="da-ml-16" color="green">
                        Available
                      </Tag>
                    </p>
                  }
                  key="3"
                  showArrow={false}
                  extra={genExtra()}
                >
                  <Row gutter={[12, 12]} align="bottom">
                    <Col xxl={18} md={15} span={24}>
                      <span className="da-font-weight-600 da-mb-8 da-d-block">Coupon Code:</span>
                      <Input placeholder="Please enter your coupon code" />
                    </Col>

                    <Col xxl={6} md={9} span={24}>
                      <Button type="primary" block>Submit Coupon</Button>
                    </Col>
                  </Row>
                </Panel>
              </Collapse>
            </div>
          </Col>

          <Summary
            totalItem={totalItem}
            totalPrice={totalPrice}
            content={true}
          />
        </Row>
      </Col>
    </Row >
  )
}