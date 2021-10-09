import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { Row, Col, Divider, Collapse, Radio, Slider, Button } from "antd";
import { RiArrowRightSLine } from "react-icons/ri";

const { Panel } = Collapse;

export default function Sidebar() {
  // Collapse
  const genExtra = () => (
    <RiArrowRightSLine
      size={24}
      className="da-collapse-arrow da-text-color-black-60"
    />
  );

  // Price Slider
  const priceMinValue = 0
  const priceMaxValue = 500
  const [priceMin, setPriceMin] = useState(priceMinValue)
  const [priceMax, setPriceMax] = useState(priceMaxValue)

  const priceOnChange = (value) => {
    setPriceMin(value[0])
    setPriceMax(value[1])
  }

  // Radio
  const [valueRate, setValueRate] = useState(0);
  const [valueTags, setValueTags] = useState(0);

  const onChangeRate = e => {
    setValueRate(e.target.value);
  };

  const onChangeTags = e => {
    setValueTags(e.target.value);
  };

  return (
    <Col flex="0 0 270px" className="da-ecommerce-app-sidebar">
      <Row className="da-border-radius da-overflow-hidden da-border-1 da-border-color-black-40 da-bg-color-black-0 da-px-24 da-py-16">
        <Col span={24}>
          <h5 className="da-mb-4 da-text-color-black-80">Digital Cameras</h5>
          <span className="da-badge-text da-d-block da-text-color-black-80">112 Product</span>
        </Col>

        <Divider />

        <Collapse defaultActiveKey={1}>
          <Panel
            header={
              <h5 className="da-mb-0 da-text-color-black-80">Categories</h5>
            }
            key="1"
            showArrow={false}
            extra={genExtra()}
          >
            <Row className="da-mt-16">
              <Col span={24}>
                <Link to="#" className="da-badge-text da-d-block da-text-color-black-80">SLR Cameras</Link>
              </Col>

              <Col span={24} className="da-mt-10">
                <Link to="#" className="da-badge-text da-d-block da-text-color-black-80">Digital Cameras</Link>
              </Col>

              <Col span={24} className="da-mt-10">
                <Link to="#" className="da-badge-text da-d-block da-text-color-black-80">Mirrorless Compact Cameras</Link>
              </Col>

              <Col span={24} className="da-mt-10">
                <Link to="#" className="da-badge-text da-d-block da-text-color-black-80">Video Cameras</Link>
              </Col>

              <Col span={24} className="da-mt-10">
                <Link to="#" className="da-badge-text da-d-block da-text-color-black-80">Action Cameras</Link>
              </Col>
            </Row>
          </Panel>
        </Collapse>

        <Divider />

        <Collapse>
          <Panel
            header={
              <h5 className="da-mb-0 da-text-color-black-80">Ratings</h5>
            }
            key="1"
            showArrow={false}
            extra={genExtra()}
          >
            <Radio.Group onChange={onChangeRate} value={valueRate}>
              <Row className="da-mt-16">
                <Col span={24}>
                  <Row align="middle" justify="space-between">
                    <Radio value={1}>Show All</Radio>
                    <span className="da-caption da-text-color-black-80">1,417</span>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row align="middle" justify="space-between">
                    <Radio value={2}>1 Star and higher</Radio>
                    <span className="da-caption da-text-color-black-80">230</span>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row align="middle" justify="space-between">
                    <Radio value={3}>2 Star and higher</Radio>
                    <span className="da-caption da-text-color-black-80">402</span>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row align="middle" justify="space-between">
                    <Radio value={4}>3 Star and higher</Radio>
                    <span className="da-caption da-text-color-black-80">188</span>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row align="middle" justify="space-between">
                    <Radio value={5}>4 Star and higher</Radio>
                    <span className="da-caption da-text-color-black-80">554</span>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row align="middle" justify="space-between">
                    <Radio value={6}>5 Star</Radio>
                    <span className="da-caption da-text-color-black-80">43</span>
                  </Row>
                </Col>
              </Row>
            </Radio.Group>
          </Panel>
        </Collapse>

        <Divider />

        <Collapse>
          <Panel
            header={
              <h5 className="da-mb-0 da-text-color-black-80">Price Range</h5>
            }
            key="1"
            showArrow={false}
            extra={genExtra()}
          >
            <Row className="da-mt-16">
              <Col span={24}>
                <Row align="middle" justify="space-between" gutter={[8]}>
                  <Col span={11}>
                    <div className="da-border-radius da-overflow-hidden da-border-1 da-border-color-black-40 da-bg-color-black-0 da-p-12">
                      <span>$ {priceMin}</span>
                    </div>
                  </Col>

                  <Col className="da-text-color-black-40">-</Col>

                  <Col span={11}>
                    <div className="da-border-radius da-overflow-hidden da-border-1 da-border-color-black-40 da-bg-color-black-0 da-p-12">
                      <span>$ {priceMax}</span>
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col span={24}>
                <Slider
                  className="da-mt-24 da-mx-16"
                  range
                  min={priceMinValue}
                  max={priceMaxValue}
                  onChange={priceOnChange}
                  defaultValue={[priceMin, priceMax]}
                  tipFormatter={null}
                />
              </Col>
            </Row>
          </Panel>
        </Collapse>

        <Divider />

        <Collapse>
          <Panel
            header={
              <h5 className="da-mb-0 da-text-color-black-80">Tags</h5>
            }
            key="1"
            showArrow={false}
            extra={genExtra()}
          >
            <Radio.Group onChange={onChangeTags} value={valueTags}>
              <Row className="da-mt-16">
                <Col span={24}>
                  <Row align="middle" justify="space-between">
                    <Radio value={1}>Featured</Radio>
                    <span className="da-caption da-text-color-black-80">1,417</span>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row align="middle" justify="space-between">
                    <Radio value={2}>On Sale</Radio>
                    <span className="da-caption da-text-color-black-80">230</span>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row align="middle" justify="space-between">
                    <Radio value={3}>New</Radio>
                    <span className="da-caption da-text-color-black-80">402</span>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row align="middle" justify="space-between">
                    <Radio value={4}>Sponsored</Radio>
                    <span className="da-caption da-text-color-black-80">188</span>
                  </Row>
                </Col>
              </Row>
            </Radio.Group>
          </Panel>
        </Collapse>

        <Button block type="primary" className="da-mt-32">Remove Filter</Button>
      </Row>
    </Col>
  )
}