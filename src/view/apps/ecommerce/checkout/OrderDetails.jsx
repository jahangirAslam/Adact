import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Row, Col, Steps, Empty, Button } from "antd";

import BreadCrumbs from '../../../../layout/components/content/breadcrumbs';
import OrderProduct from './OrderProduct';
import Summary from './Summary';

import EmptyImage from '../../../../assets/images/apps/ecommerce/checkout-empty.svg';

const { Step } = Steps;

export default function OrderDetails(props) {
  const { totalItem, totalPrice } = props
  const cart = useSelector(state => state.ecommerce.cart)

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
            {
              cart.length !== 0 && (
                <>
                  <div className="da-p-24 da-border-radius da-border-1 da-border-color-black-40 da-bg-color-black-0 da-mb-32 da-overflow-scroll da-scrollbar-x-hidden">
                    <Steps size="small" current={0}>
                      <Step title={
                        <Link to="/apps/ecommerce/checkout">
                          <span className="da-text-color-black-100">Order Details</span>
                        </Link>

                      } />
                      <Step title={
                        <Link to="#">
                          <span className="da-text-color-black-60">Address Informations</span>
                        </Link>
                      }
                      />
                      <Step title={
                        <Link to="#">
                          <span className="da-text-color-black-60">Payment</span>
                        </Link>
                      } />
                    </Steps>
                  </div>

                  <Row className="da-mb-16 da-pr-24 da-ecommerce-app-checkout-title-table" style={{ paddingLeft: 190 }}>
                    <Col flex="1 0 0">
                      <span className="da-d-block h5 da-text-color-black-80">Name</span>
                    </Col>

                    <Col flex="0 0 205px">
                      <span className="da-d-block h5 da-text-color-black-80">Quantity</span>
                    </Col>

                    <Col className="da-text-right">
                      <span className="da-d-block h5 da-text-color-black-80">Price</span>
                    </Col>
                  </Row>
                </>
              )
            }

            <Row gutter={[32, 32]}>
              {
                cart.length !== 0 && (
                  cart.map((value) => (
                    <OrderProduct key={value.id} value={value} />
                  ))
                )
              }
            </Row>
          </Col>

          {
            cart.length !== 0 ? (
              <Summary
                totalItem={totalItem}
                totalPrice={totalPrice}
                stepUrl='/apps/ecommerce/address-information'
              />
            ) : (
              <Col span={24}>
                <Empty
                  className="da-mt-32"
                  image={EmptyImage}
                  imageStyle={{
                    height: 160,
                  }}
                  description={
                    <h5>Your bag is empty</h5>
                  }
                >
                  <Button type="primary">
                    <Link to="/apps/ecommerce/shop">Go to shop list</Link>
                  </Button>
                </Empty>
              </Col>
            )
          }
        </Row>
      </Col>
    </Row>
  )
}