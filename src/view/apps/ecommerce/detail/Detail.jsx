import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, adjustItemQty, loadCurrentItem } from '../../../../redux/ecommerce/ecommerceActions';

import Slider from "react-slick";
import { Row, Col, Button, Card, Rate, Divider, InputNumber, Tag } from "antd";
import { RiArrowRightUpLine, RiShoppingBagLine, RiTruckLine, RiCheckboxCircleLine, RiShieldLine, RiTimeLine, RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

import BreadCrumbs from '../../../../layout/components/content/breadcrumbs';

export default function Detail() {
  const [nav1, setNav1] = useState(null)
  const [nav2, setNav2] = useState(null)

  let slider1 = []
  let slider2 = []

  useEffect(() => {
    setNav1(slider1)
    setNav2(slider2)
  }, [slider1, slider2])

  // Redux
  const products = useSelector(state => state.ecommerce.products)

  const value = useSelector(state => state.ecommerce.currentItem)
  const dispatch = useDispatch()

  // Qty
  const onChangeHandler = (e, valueId) => {
    dispatch(adjustItemQty(valueId, e))
  };

  // Price
  const discountSplit1 = value.discount.toString().split('.')[0];
  const discountSplit2 = value.discount.toString().split('.')[1];

  const priceSplit1 = value.price.toString().split('.')[0];
  const priceSplit2 = value.price.toString().split('.')[1];

  // Other Slide
  function SampleNextArrow(props) {
    const { onClick } = props;

    return (
      <Button
        onClick={onClick}
        className="da-other-slide-next-arrow"
        icon={<RiArrowRightSLine className="remix-icon" size={18} />}
      ></Button>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;

    return (
      <Button
        onClick={onClick}
        className="da-other-slide-prev-arrow"
        icon={<RiArrowLeftSLine className="remix-icon" size={18} />}
      ></Button>
    );
  }

  return (
    <Row className="da-ecommerce-app-detail da-mb-32" key={value.id}>
      <Col className="da-mb-32" span={24}>
        <Row gutter={[32, 32]}>
          <BreadCrumbs
            breadCrumbParent="Applications"
            breadCrumbParent2="E-Commerce"
            breadCrumbActive="Product Detail"
          />
        </Row>
      </Col>

      <Col span={24}>
        <Card className="da-border-color-black-40">
          <Row>
            {
              value.featured && (
                <Tag className="da-position-absolute-top-left da-z-index da-m-sm-16 da-m-32 da-border-none da-py-4 da-font-weight-600" color="blue">
                  Featured
                </Tag>
              )
            }

            {
              value.onSale && (
                <Tag className="da-position-absolute-top-left da-z-index da-m-sm-16 da-m-32 da-border-none da-py-4 da-font-weight-600" color="red">
                  On Sale
                </Tag>
              )
            }

            {
              value.new && (
                <Tag className="da-position-absolute-top-left da-z-index da-m-sm-16 da-m-32 da-border-none da-py-4 da-font-weight-600" color="green">
                  New
                </Tag>
              )
            }

            {
              value.sponsored && (
                <Tag className="da-position-absolute-top-left da-z-index da-m-sm-16 da-m-32 da-border-none da-py-4 da-font-weight-600" color="yellow">
                  Sponsored
                </Tag>
              )
            }

            <Col lg={12} span={24} className="da-ecommerce-app-detail-slider da-mt-sm-24 da-mb-md-64 da-mb-md-32">
              {
                value.images ? (
                  <>
                    <Slider
                      asNavFor={nav2}
                      infinite={false}
                      ref={slider => (slider1 = slider)}
                    >
                      {
                        value.images.map((item, index) => (
                          <div key={index} className="da-d-flex-full-center">
                            <img src={require(`../../../../assets/images/product/${item.img}`).default} alt={item.title} />
                          </div>
                        ))
                      }
                    </Slider>

                    <Slider
                      asNavFor={nav1}
                      ref={slider => (slider2 = slider)}
                      slidesToShow={4}
                      swipeToSlide={true}
                      focusOnSelect={true}
                      infinite={false}
                      responsive={[
                        {
                          breakpoint: 767,
                          settings: {
                            slidesToShow: 3,
                          }
                        }
                      ]}
                    >
                      {
                        value.images.map((item, index) => (
                          <div key={index} className="da-slick-slide-item da-mx-8 da-d-flex-full-center">
                            <div className="da-border-1 da-border-color-black-40 da-border-radius da-d-flex-full-center">
                              <img src={require(`../../../../assets/images/product/${item.img}`).default} alt={item.title} />
                            </div>
                          </div>
                        ))
                      }
                    </Slider>
                  </>
                ) : (
                  <div className="da-ecommerce-app-detail-single-image da-text-center">
                    <img src={require(`../../../../assets/images/product/${value.imgList}`).default} alt={value.title} />
                  </div>
                )
              }
            </Col>

            <Col lg={12} span={24}>
              <h2 className="da-mb-8">{value.title}</h2>

              <span className="da-caption da-d-block da-text-color-black-60">
                By
                <span className="da-ml-4 da-text-color-black-80">{value.person}</span>
              </span>

              <Row className="da-mt-24 da-pr-42" align="middle" justify="space-between">
                <Col md={12} span={24}>
                  <Row align="middle">
                    {

                      value.discount !== '' && (
                        <div className="da-d-inline-block da-border-radius da-bg-color-danger-1 da-caption da-line-height-normal da-text-color-black-0 da-text-center da-px-6 da-py-4 da-mr-8">
                          Save <br /> %14
                        </div>
                      )
                    }

                    <Col>
                      <Row align="bottom" className="da-h-100">
                        {
                          value.discount ? (
                            <>
                              <span className="h2 da-d-inline-block da-mb-0 da-mr-4">
                                ${discountSplit1}.
                                <sup style={{ top: -6 }}>
                                  {discountSplit2}
                                </sup>
                              </span>

                              <span className="da-d-inline-block da-mb-6 da-text-color-black-60 da-text-line-through da-p1-body da-font-weight-600">
                                ${priceSplit1}.
                                <sup style={{ top: -3 }}>
                                  {priceSplit2}
                                </sup>
                              </span>
                            </>
                          ) : (
                            <span className="h2 da-d-inline-block da-mb-0 da-mr-4">
                              ${priceSplit1}.
                              <sup style={{ top: -6 }}>
                                {priceSplit2}
                              </sup>
                            </span>
                          )
                        }
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col className="da-mt-sm-24">
                  <Row align="middle" className="da-mb-4">
                    <Rate defaultValue={value.rate} allowHalf style={{ fontSize: 15 }}></Rate>

                    <span className="da-d-block da-text-left da-caption da-text-color-black-80 da-ml-8">
                      {value.rate}
                    </span>
                  </Row>

                  <span className="da-d-block da-text-left da-caption da-text-color-black-80">
                    {value.ratings} Ratings
                  </span>
                </Col>
              </Row>

              <Divider />

              {
                value.colors && (
                  <>
                    <Row gutter={[16, 16]} className="da-pr-32">
                      {
                        products.map((item) =>
                          value.colors.map((colorIndex) =>
                            (item.id == colorIndex) && (
                              <Col key={item.id} md={6} span={12} >
                                <Link
                                  to={`/apps/ecommerce/product-detail/${item.id}`}
                                  onClick={() => dispatch(loadCurrentItem(item))}
                                >
                                  <div className="da-border-radius da-border-1 da-border-color-black-40 da-px-8 da-py-12">
                                    <Row align="middle" justify="center">
                                      <Col className="da-mr-4">
                                        <img src={require(`../../../../assets/images/product/${item.imgList}`).default} height={28} alt={item.color} />
                                      </Col>

                                      <Col span={12} className="da-text-center">
                                        <span className="da-d-block da-input-description da-text-color-black-80 da-font-weight-400">{item.color}</span>

                                        {
                                          item.discount ? (
                                            <span className="da-d-block da-input-description da-text-color-black-100">{item.discount}</span>
                                          ) : (
                                            <span className="da-d-block da-input-description da-text-color-black-100">{item.price}</span>
                                          )
                                        }
                                      </Col>
                                    </Row>
                                  </div>
                                </Link>
                              </Col>
                            )
                          )
                        )
                      }
                    </Row>

                    <Divider />
                  </>
                )
              }


              <Row gutter={[24, 24]}>
                {
                  !value.addToCartCheck ? (
                    value.basketBtn && (
                      <Col>
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
                        <Col>
                          <InputNumber
                            min={1}
                            max={99}
                            value={value.qty}
                            onChange={(e) => onChangeHandler(e, value.id)}
                          />
                        </Col>

                        <Col>
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

                <Col span={24}>
                  <Row gutter={[8, 8]}>
                    <Col span={24} className="da-d-flex-center">
                      <RiTruckLine className="da-text-color-primary-1" />
                      <span className="da-caption da-text-color-black-80 da-font-weight-400 da-text-underline da-ml-4">Free Shipping Worldwide</span>
                    </Col>

                    <Col span={24} className="da-d-flex-center">
                      <RiCheckboxCircleLine className="da-text-color-primary-1" />
                      <span className="da-caption da-text-color-black-80 da-font-weight-400 da-text-underline da-ml-4">Available in stocks</span>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Divider />

              <Row gutter={[24, 24]}>
                <Col md={10} span={24}>
                  <Row align="middle">
                    <Col
                      className="da-border-radius-full da-bg-color-primary-4 da-d-flex-full-center da-mr-8"
                      style={{ width: 36, height: 36 }}
                    >
                      <RiShieldLine className="da-text-color-primary-1" size={24} />
                    </Col>

                    <Col>
                      <span className="da-d-block da-p1-body da-font-weight-600 da-text-color-black-100">
                        1 Year Warranty
                      </span>
                      <span className="da-d-block da-input-description da-font-weight-400 da-text-color-black-80">
                        Lorem Ipsum Dolor Sıt Amet
                      </span>
                    </Col>
                  </Row>
                </Col>

                <Col md={10} span={24}>
                  <Row align="middle">
                    <Col
                      className="da-border-radius-full da-bg-color-primary-4 da-d-flex-full-center da-mr-8"
                      style={{ width: 36, height: 36 }}
                    >
                      <RiTimeLine className="da-text-color-primary-1" size={24} />
                    </Col>

                    <Col>
                      <span className="da-d-block da-p1-body da-font-weight-600 da-text-color-black-100">
                        14 Days Replacement
                      </span>
                      <span className="da-d-block da-input-description da-font-weight-400 da-text-color-black-80">
                        Lorem Ipsum Dolor Sıt Amet
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>

          <Divider />

          <Row>
            <Col span={24} className="da-ecommerce-app-detail-other-slider da-mt-64">
              <Slider
                dots={false}
                infinite={false}
                slidesToShow={6}
                slidesToScroll={1}
                nextArrow={<SampleNextArrow />}
                prevArrow={<SamplePrevArrow />}
                responsive={[
                  {
                    breakpoint: 1199,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                    }
                  },
                  {
                    breakpoint: 767,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                    }
                  }
                ]}
              >
                {
                  products.map((item, index) =>
                    (item.id !== value.id) && (
                      <div key={index} className="da-px-12">
                        <Link
                          to={`/apps/ecommerce/product-detail/${item.id}`}
                          className="da-d-block da-border-radius da-border-1 da-border-color-black-40 da-card-3 da-p-16 da-text-center"
                          onClick={() => dispatch(loadCurrentItem(item))}
                        >
                          <img src={require(`../../../../assets/images/product/${item.imgList}`).default} height={90} className="da-m-auto" alt={item.title} />

                          <h5 className="da-mb-0 da-mt-24 da-mx-12 da-text-color-black-100 da-p1-body da-font-weight-700">
                            {item.title}
                          </h5>

                          <h4 className="da-mb-8 da-mt-16 da-text-color-primary-1">
                            {
                              item.discount ? (
                                item.discount
                              ) : (
                                item.price
                              )
                            }
                          </h4>

                          <Row align="middle" justify="center">
                            <RiArrowRightUpLine
                              size={16}
                              className="da-text-color-success-1"
                            />
                            <span className="da-d-block da-mb-0 da-mr-8 da-badge-text da-text-color-success-1">
                              +4
                            </span>
                            <span className="da-d-block da-mb-0 da-badge-text da-text-color-black-60">New Item</span>
                          </Row>
                        </Link>
                      </div>
                    )
                  )
                }
              </Slider>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row >
  )
}