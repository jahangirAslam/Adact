import React from "react";

import { Row, Col, Button } from "antd";

export default function PricingItem(props) {
  const listSVG = (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.99992 13.6667C3.31792 13.6667 0.333252 10.682 0.333252 7.00004C0.333252 3.31804 3.31792 0.333374 6.99992 0.333374C10.6819 0.333374 13.6666 3.31804 13.6666 7.00004C13.6666 10.682 10.6819 13.6667 6.99992 13.6667ZM6.99992 12.3334C8.41441 12.3334 9.77096 11.7715 10.7712 10.7713C11.7713 9.77108 12.3333 8.41453 12.3333 7.00004C12.3333 5.58555 11.7713 4.229 10.7712 3.2288C9.77096 2.22861 8.41441 1.66671 6.99992 1.66671C5.58543 1.66671 4.22888 2.22861 3.22868 3.2288C2.22849 4.229 1.66659 5.58555 1.66659 7.00004C1.66659 8.41453 2.22849 9.77108 3.22868 10.7713C4.22888 11.7715 5.58543 12.3334 6.99992 12.3334ZM6.33525 9.66671L3.50659 6.83804L4.44925 5.89537L6.33525 7.78137L10.1059 4.01004L11.0493 4.95271L6.33525 9.66671Z"
        fill="#0010F7"
      />
    </svg>
  );
  const listItem = "da-pricing-item-list da-d-flex-center da-mt-8";
  const listText = "da-d-block da-ml-8 da-caption da-font-weight-400";

  const listMap = props.values.map((item, index) => (
    <Col
      className={`da-pricing-item da-p-24 da-mx-xl-8 da-mx-16 da-mb-sm-24 da-mb-16 da-border-1 da-border-color-black-40 da-border-radius ${item.special ? "da-pricing-item-special" : ""
        }`}
      key={index}
    >
      <div>
        <Row justify="space-between">
          <Col span={item.best ? 15 : 24}>
            <h5 className="da-mb-0 da-pricing-item-title">{item.title}</h5>
            <p className="da-pricing-item-subtitle da-caption da-mb-sm-8 da-mb-32 da-text-color-black-60">
              {item.subTitle}
            </p>
          </Col>

          {item.best && (
            <Col md={9} span={5}>
              <Button
                type="primary"
                className="da-pricing-item-best-button da-caption da-py-4 da-px-16 da-bg-color-primary-4 da-text-color-primary-1"
              >
                Best Price
              </Button>
            </Col>
          )}
        </Row>

        <span className="da-pricing-item-price h1">{item.price}</span>
        <p className="da-pricing-item-billed da-caption da-mt-sm-0 da-mt-4 da-mb-0 da-text-color-black-60">
          {item.billed}
        </p>

        <ul className="da-mt-24 da-mb-0 da-p-0">
          {item.list.map((item, index) => (
            <li key={index} className={listItem}>
              {listSVG}
              <span className={listText}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button className="da-mt-32" block type="primary">
        {item.button}
      </Button>
    </Col>
  ));

  return (
    <Row align="top" justify="center">
      {listMap}
    </Row>
  );
}