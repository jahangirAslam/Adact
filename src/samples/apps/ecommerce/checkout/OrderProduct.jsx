import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { removeFromCart, adjustItemQty, loadCurrentItem } from '../../../../redux/ecommerce/ecommerceActions';

import { Row, Col, InputNumber } from "antd";
import { RiCheckboxCircleFill } from "react-icons/ri";

export default function OrderProduct(props) {
  const { value } = props
  const dispatch = useDispatch()

  // Qty
  const [input, setInput] = useState(value.qty);

  const onChangeHandler = (e) => {
    setInput(e);
    dispatch(adjustItemQty(value.id, e))
  };

  // Price Split
  const discountSplit1 = value.discount.toString().split('.')[0];
  const discountSplit2 = value.discount.toString().split('.')[1];

  const priceSplit1 = value.price.toString().split('.')[0];
  const priceSplit2 = value.price.toString().split('.')[1];

  return (
    <Col span={24}>
      <div className="da-p-sm-16 da-p-24 da-border-radius da-border-1 da-border-color-black-40 da-bg-color-black-0">
        <Row align="middle" justify="space-between">
          <Col md={13} span={24}>
            <Row align="middle">
              <Col flex="0 0 135px" className="da-ecommerce-app-checkout-item-img">
                <Link to={`/apps/ecommerce/product-detail/${value.id}`} onClick={() => dispatch(loadCurrentItem(value))}>
                  <img src={require(`../../../../assets/images/product/${value.imgList}`).default} alt={value.title} />
                </Link>
              </Col>

              <Col flex="1 0 0" className="da-ecommerce-app-checkout-text da-mt-sm-16 da-pl-sm-0 da-pl-32">
                <h4 className="da-mb-4">{value.title}</h4>

                <span className="da-caption da-d-block da-text-color-black-60">
                  By
                  <span className="da-ml-4 da-text-color-black-80">{value.person}</span>
                </span>

                <p className="da-mt-8 da-mb-0 da-caption da-font-weight-400 da-text-color-black-60">
                  {value.checkoutText}
                </p>
              </Col>
            </Row>
          </Col>

          <Col md={11} span={24} className="da-mt-sm-24 da-ecommerce-app-checkout-info">
            <Row align="middle" justify="end">
              <Col>
                <InputNumber
                  min={1}
                  max={99}
                  defaultValue={input}
                  onChange={onChangeHandler}
                />

                <div
                  className="da-cursor-pointer da-mt-4 da-caption da-text-color-black-60 da-text-underline"
                  onClick={() => dispatch(removeFromCart(value.id))}
                >
                  Remove
                </div>
              </Col>

              <Col className="da-text-right da-ml-64">
                <div className="h2 da-text-color-black-80">
                  {
                    value.discount ? (
                      <span>
                        {discountSplit1}.
                        <sup style={{ top: -6 }}>
                          {discountSplit2}
                        </sup>
                      </span>
                    ) : (
                      <span>
                        {priceSplit1}.
                        <sup style={{ top: -6 }}>
                          {priceSplit2}
                        </sup>
                      </span>
                    )
                  }
                </div>

                {
                  value.freeShipping && (
                    <div className="da-d-flex-center da-mt-4 da-caption da-font-weight-400 da-text-color-success-1 da-text-underline">
                      <RiCheckboxCircleFill className="da-mr-4" />
                      Free Shipping
                    </div>
                  )
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Col>
  )
}