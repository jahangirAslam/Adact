import React from 'react'
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { addToCart, addToWish, adjustItemQty, loadCurrentItem, removeFromWishlist } from '../../../../redux/ecommerce/ecommerceActions';

import { Row, Col, Button, Card, Tag, Rate, InputNumber } from "antd";
import { RiHeartFill, RiShoppingBagLine } from "react-icons/ri";

export default function Product(props) {
  const { value } = props;
  const dispatch = useDispatch()

  // Qty
  const onChangeHandler = (e) => {
    dispatch(adjustItemQty(value.id, e))
  };

  return (
    <Col xl={8} md={12} span={24}>
      <Card className="da-border-color-black-40 da-card-6 da-mb-32 da-eCommerceCardOne">
        <Row>
          <Col span={24}>
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
          </Col>

          <Col span={24}>
            {
              value.imgList && (
                <Col className="da-text-center da-my-24">
                  <Link to={`/apps/ecommerce/product-detail/${value.id}`} onClick={() => dispatch(loadCurrentItem(value))}>
                    <img src={require(`../../../../assets/images/product/${value.imgList}`).default} alt={value.title} height={125} />
                  </Link>
                </Col>
              )
            }

            <Row justify="space-between">
              {
                value.rate && (
                  <Col>
                    <Rate defaultValue={parseFloat(value.rate)} allowHalf></Rate>
                  </Col>
                )
              }

              <Col>
                <Row align="middle">
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
              </Col>
            </Row>

            <Col className="da-mb-24 da-mt-16">
              {
                value.title && (
                  <p className="da-mb-4 da-text-color-black-100 da-p1-body da-font-weight-700">
                    {value.title}
                  </p>
                )
              }

              {
                value.subTitle && (
                  <p className="da-mb-0 da-caption da-font-weight-400 da-text-color-black-80">
                    {value.subTitle}
                  </p>
                )
              }
            </Col>

            <Row gutter={16}>
              {
                value.detailBtn && (
                  <Col
                    span={24}
                    className="da-mb-8"
                  >
                    <Link to={`/apps/ecommerce/product-detail/${value.id}`} onClick={() => dispatch(loadCurrentItem(value))}>
                      <Button block className="da-text-color-black-60 da-hover-text-color-primary-1">
                        Check Detail
                      </Button>
                    </Link>
                  </Col>
                )
              }

              {
                !value.addToCartCheck ? (
                  value.basketBtn && (
                    <Col span={24}>
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
                  <Col span={24}>
                    <Row gutter={[8, 8]}>
                      <Col span={8}>
                        <InputNumber
                          min={1}
                          max={99}
                          value={value.qty}
                          onChange={onChangeHandler}
                          className="da-w-100"
                        />
                      </Col>

                      <Col span={16}>
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
                    </Row>
                  </Col>
                )
              }
            </Row>
          </Col>
        </Row>
      </Card>
    </Col >
  )
}