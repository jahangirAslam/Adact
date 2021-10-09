import React from 'react'
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { addToCart, addToWish, adjustItemQty, loadCurrentItem, removeFromWishlist } from '../../../../redux/ecommerce/ecommerceActions';

import { Row, Col, Button, Card, Tag, Rate, InputNumber } from "antd";
import { RiHeartFill, RiShoppingBagLine } from "react-icons/ri";

export default function ProductLarge(props) {
  const { value } = props;
  const dispatch = useDispatch()

  // Qty
  const onChangeHandler = (e) => {
    dispatch(adjustItemQty(value.id, e))
  };

  return (
    <Col span={24}>
      <Card className="da-border-color-black-40 da-mb-32 da-eCommerceCardOne da-eCommerceCardOne-large">
        <Row gutter={32}>
          <Col md={10} span={24} className="da-mb-md-24">
            <Row justify="space-between" align="top">
              {
                value.featured && (
                  <Tag className="da-border-none da-py-4 da-font-weight-600" color="blue">
                    Featured
                  </Tag>
                )
              }

              {
                value.onSale && (
                  <Tag className="da-border-none da-py-4 da-font-weight-600" color="red">
                    On Sale
                  </Tag>
                )
              }

              {
                value.new && (
                  <Tag className="da-border-none da-py-4 da-font-weight-600" color="green">
                    New
                  </Tag>
                )
              }

              {
                value.sponsored && (
                  <Tag className="da-border-none da-py-4 da-font-weight-600" color="yellow">
                    Sponsored
                  </Tag>
                )
              }

              {
                value.wishCheck ? (
                  <div
                    className='da-cursor-pointer da-border-radius-round remix-icon da-p-8 da-rate da-text-color-danger-1 da-bg-color-danger-4'
                    onClick={() => dispatch(removeFromWishlist(value.id))}
                  >
                    <RiHeartFill />
                  </div>
                ) : (
                  <div
                    className='da-cursor-pointer da-border-radius-round remix-icon da-p-8 da-rate da-text-color-black-40 da-bg-color-black-10'
                    onClick={() => dispatch(addToWish(value.id, value))}
                  >
                    <RiHeartFill />
                  </div>
                )
              }
            </Row>

            {
              value.imgList && (
                <Col className="da-text-center">
                  <Link to={`/apps/ecommerce/product-detail/${value.id}`} onClick={() => dispatch(loadCurrentItem(value))}>
                    <img src={require(`../../../../assets/images/product/${value.imgList}`).default} alt={value.title} height={156} />
                  </Link>
                </Col>
              )
            }
          </Col>

          <Col md={14} span={24}>
            {
              value.rate && (
                <Rate defaultValue={parseFloat(value.rate)} allowHalf></Rate>
              )
            }

            <div className="da-my-8">
              {
                value.title && (
                  <h4 className="da-mb-4">
                    {value.title}
                  </h4>
                )
              }

              {
                value.person && (
                  <p className="da-caption da-mb-0 da-text-color-black-60">
                    By <span className="da-text-color-black-80">  {value.person}</span>
                  </p>
                )
              }
            </div>

            {
              value.largeText && (
                <p className="da-mb-0 da-p1-body da-font-weight-400 da-text-color-black-80">
                  {value.largeText}
                </p>
              )
            }

            <Row align="middle" className="da-my-8">
              {
                value.discount ? (
                  <p className="da-mb-0 da-mr-4 da-text-color-black-60 da-text-line-through da-input-description">
                    ${value.price}
                  </p>
                ) : (
                  <p className="da-mb-0 da-text-color-primary-1 da-font-weight-700">
                    ${value.price}
                  </p>
                )
              }

              {
                value.discount && (
                  <p className="da-mb-0 da-text-color-primary-1 da-font-weight-700">
                    ${value.discount}
                  </p>
                )
              }
            </Row>

            <Row gutter={[8, 8]}>
              {
                value.detailBtn && (
                  <Col
                    xl={10} md={12} span={24}
                    className="da-mt-xs-8"
                  >
                    <Link to={`/apps/ecommerce/product-detail/${value.id}`} onClick={() => dispatch(loadCurrentItem(value))}>
                      <Button className="da-mr-8 da-text-color-black-60 da-hover-text-color-primary-1" block>
                        Check Detail
                      </Button>
                    </Link>
                  </Col>
                )
              }

              {
                !value.addToCartCheck ? (
                  value.basketBtn && (
                    <Col xl={10} lg={12} span={24}>
                      <Button
                        block
                        icon={<RiShoppingBagLine className="remix-icon" />}
                        type="primary"
                        onClick={() => dispatch(addToCart(value.id))}
                      >
                        Add to Cart
                      </Button>
                    </Col>
                  )
                ) : (
                  <>
                    <Col xl={null} md={6} span={12}>
                      <InputNumber
                        min={1}
                        max={99}
                        value={value.qty}
                        onChange={onChangeHandler}
                        className="da-w-100"
                      />
                    </Col>

                    <Col xl={null} md={6} span={12}>
                      <Link to="/apps/ecommerce/checkout">
                        <Button
                          block
                          icon={<RiShoppingBagLine className="remix-icon" />}
                          type="primary"
                        >
                          Go to Cart
                        </Button>
                      </Link>
                    </Col>
                  </>
                )
              }
            </Row>
          </Col>
        </Row>
      </Card>
    </Col >
  )
}