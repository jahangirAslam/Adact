import React, { useState } from "react";

import { Row, Col, Input, Tag } from "antd";
import {
  RiFlagLine,
  RiPriceTag3Line,
  RiCustomerServiceLine,
  RiMailSendLine,
  RiMailLine,
  RiBasketballLine
} from "react-icons/ri";

import Breadcrumbs from "../../../layout/components/content/breadcrumbs";
import ActionButton from "../../../layout/components/content/action-button";
import MenuFAQ from "./menu";
import CollapseItemFAQ from "./collapseItem";

const { Search } = Input;

const text = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget eleifend lectus. Sed quis nisi lectus. Quisque vel leo diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer sit amet nisi eu nisi tincidunt facilisis. Sed mollis nisl dui, a sodales massa sodales sit amet. Sed nisl est, volutpat sed feugiat non, maximus id orci. Fusce placerat congue nulla, a consectetur massa hendrerit a.
`;

const data = [
  {
    icon:
      <RiFlagLine
        className="remix-icon da-text-color-black-80"
        size={20}
      />,
    title:
      <span className="da-p1-body da-text-color-black-100">
        Getting Started
      </span>,
    items: [
      {
        item: [
          {
            icon:
              <RiBasketballLine
                size={24}
                className="remix-icon da-text-color-primary-1 da-mr-18"
              />,
            title: <span>Lorem Ipsum Collapse Title 1-1</span>,
            tag:
              <Tag className="da-ml-16" color="blue">
                Tag
                </Tag>,
            text: <p className="da-p1-body">{text}</p>
          },
          {
            icon:
              <RiBasketballLine
                size={24}
                className="remix-icon da-text-color-primary-1 da-mr-18"
              />,
            title: <span>Lorem Ipsum Collapse Title 1-2</span>,
            tag:
              <Tag className="da-ml-16" color="blue">
                Tag
                </Tag>,
            text: <p className="da-p1-body">{text}</p>
          },
          {
            icon:
              <RiBasketballLine
                size={24}
                className="remix-icon da-text-color-primary-1 da-mr-18"
              />,
            title: <span>Lorem Ipsum Collapse Title 1-3</span>,
            tag:
              <Tag className="da-ml-16" color="blue">
                Tag
                </Tag>,
            text: <p className="da-p1-body">{text}</p>
          }
        ]
      },
      {
        item: [
          {
            icon:
              <RiBasketballLine
                size={24}
                className="remix-icon da-text-color-primary-1 da-mr-18"
              />,
            title: <span>Lorem Ipsum Collapse Title 1-1</span>,
            tag:
              <Tag className="da-ml-16" color="blue">
                Tag
                </Tag>,
            text: <p className="da-p1-body">{text}</p>
          },
          {
            icon:
              <RiBasketballLine
                size={24}
                className="remix-icon da-text-color-primary-1 da-mr-18"
              />,
            title: <span>Lorem Ipsum Collapse Title 1-2</span>,
            tag:
              <Tag className="da-ml-16" color="blue">
                Tag
                </Tag>,
            text: <p className="da-p1-body">{text}</p>
          },
          {
            icon:
              <RiBasketballLine
                size={24}
                className="remix-icon da-text-color-primary-1 da-mr-18"
              />,
            title: <span>Lorem Ipsum Collapse Title 1-3</span>,
            tag:
              <Tag className="da-ml-16" color="blue">
                Tag
                </Tag>,
            text: <p className="da-p1-body">{text}</p>
          }
        ]
      },
      {
        item: [
          {
            icon:
              <RiBasketballLine
                size={24}
                className="remix-icon da-text-color-primary-1 da-mr-18"
              />,
            title: <span>Lorem Ipsum Collapse Title 1-1</span>,
            tag:
              <Tag className="da-ml-16" color="blue">
                Tag
                </Tag>,
            text: <p className="da-p1-body">{text}</p>
          },
          {
            icon:
              <RiBasketballLine
                size={24}
                className="remix-icon da-text-color-primary-1 da-mr-18"
              />,
            title: <span>Lorem Ipsum Collapse Title 1-2</span>,
            tag:
              <Tag className="da-ml-16" color="blue">
                Tag
                </Tag>,
            text: <p className="da-p1-body">{text}</p>
          },
          {
            icon:
              <RiBasketballLine
                size={24}
                className="remix-icon da-text-color-primary-1 da-mr-18"
              />,
            title: <span>Lorem Ipsum Collapse Title 1-3</span>,
            tag:
              <Tag className="da-ml-16" color="blue">
                Tag
                </Tag>,
            text: <p className="da-p1-body">{text}</p>
          }
        ]
      },
    ]
  },
  {
    icon:
      <RiPriceTag3Line
        className="remix-icon da-text-color-black-80"
        size={20}
      />,
    title:
      <span className="da-p1-body da-text-color-black-100">
        Pricing
      </span>,
    items: [
      {
        item: [
          {
            icon:
              <RiBasketballLine
                size={24}
                className="remix-icon da-text-color-primary-1 da-mr-18"
              />,
            title: <span>Lorem Ipsum Collapse Title 2</span>,
            tag:
              <Tag className="da-ml-16" color="blue">
                Tag
                </Tag>,
            text: <p className="da-p1-body">{text}</p>
          },
          {
            icon:
              <RiBasketballLine
                size={24}
                className="remix-icon da-text-color-primary-1 da-mr-18"
              />,
            title: <span>Lorem Ipsum Collapse Title 2</span>,
            tag:
              <Tag className="da-ml-16" color="blue">
                Tag
                </Tag>,
            text: <p className="da-p1-body">{text}</p>
          },
          {
            icon:
              <RiBasketballLine
                size={24}
                className="remix-icon da-text-color-primary-1 da-mr-18"
              />,
            title: <span>Lorem Ipsum Collapse Title 2</span>,
            tag:
              <Tag className="da-ml-16" color="blue">
                Tag
                </Tag>,
            text: <p className="da-p1-body">{text}</p>
          }
        ]
      },
    ]
  },
  {
    icon:
      <RiCustomerServiceLine
        className="remix-icon da-text-color-black-80"
        size={20}
      />,
    title:
      <span className="da-p1-body da-text-color-black-100">
        Call Service
      </span>,
    items: [
      {
        item: [
          {
            icon:
              <RiBasketballLine
                size={24}
                className="remix-icon da-text-color-primary-1 da-mr-18"
              />,
            title: <span>Lorem Ipsum Collapse Title 3</span>,
            tag:
              <Tag className="da-ml-16" color="blue">
                Tag
                </Tag>,
            text: <p className="da-p1-body">{text}</p>
          },
          {
            icon:
              <RiBasketballLine
                size={24}
                className="remix-icon da-text-color-primary-1 da-mr-18"
              />,
            title: <span>Lorem Ipsum Collapse Title 3</span>,
            tag:
              <Tag className="da-ml-16" color="blue">
                Tag
                </Tag>,
            text: <p className="da-p1-body">{text}</p>
          },
          {
            icon:
              <RiBasketballLine
                size={24}
                className="remix-icon da-text-color-primary-1 da-mr-18"
              />,
            title: <span>Lorem Ipsum Collapse Title 3</span>,
            tag:
              <Tag className="da-ml-16" color="blue">
                Tag
                </Tag>,
            text: <p className="da-p1-body">{text}</p>
          }
        ]
      },
    ]
  },
  {
    icon:
      <RiMailSendLine
        className="remix-icon da-text-color-black-80"
        size={20}
      />,
    title:
      <span className="da-p1-body da-text-color-black-100">
        Mailing
      </span>,
    items: [
      {
        item: [
          {
            icon:
              <RiBasketballLine
                size={24}
                className="remix-icon da-text-color-primary-1 da-mr-18"
              />,
            title: <span>Lorem Ipsum Collapse Title 4</span>,
            tag:
              <Tag className="da-ml-16" color="blue">
                Tag
                </Tag>,
            text: <p className="da-p1-body">{text}</p>
          },
          {
            icon:
              <RiBasketballLine
                size={24}
                className="remix-icon da-text-color-primary-1 da-mr-18"
              />,
            title: <span>Lorem Ipsum Collapse Title 4</span>,
            tag:
              <Tag className="da-ml-16" color="blue">
                Tag
                </Tag>,
            text: <p className="da-p1-body">{text}</p>
          },
          {
            icon:
              <RiBasketballLine
                size={24}
                className="remix-icon da-text-color-primary-1 da-mr-18"
              />,
            title: <span>Lorem Ipsum Collapse Title 4</span>,
            tag:
              <Tag className="da-ml-16" color="blue">
                Tag
                </Tag>,
            text: <p className="da-p1-body">{text}</p>
          }
        ]
      },
    ]
  },
  {
    icon:
      <RiMailLine
        className="remix-icon da-text-color-black-80"
        size={20}
      />,
    title:
      <span className="da-p1-body da-text-color-black-100">
        Server
      </span>,
    items: [
      {
        item: [
          {
            icon:
              <RiBasketballLine
                size={24}
                className="remix-icon da-text-color-primary-1 da-mr-18"
              />,
            title: <span>Lorem Ipsum Collapse Title 5</span>,
            tag:
              <Tag className="da-ml-16" color="blue">
                Tag
                </Tag>,
            text: <p className="da-p1-body">{text}</p>
          },
          {
            icon:
              <RiBasketballLine
                size={24}
                className="remix-icon da-text-color-primary-1 da-mr-18"
              />,
            title: <span>Lorem Ipsum Collapse Title 5</span>,
            tag:
              <Tag className="da-ml-16" color="blue">
                Tag
                </Tag>,
            text: <p className="da-p1-body">{text}</p>
          },
          {
            icon:
              <RiBasketballLine
                size={24}
                className="remix-icon da-text-color-primary-1 da-mr-18"
              />,
            title: <span>Lorem Ipsum Collapse Title 5</span>,
            tag:
              <Tag className="da-ml-16" color="blue">
                Tag
                </Tag>,
            text: <p className="da-p1-body">{text}</p>
          }
        ]
      },
    ]
  },
]

export default function FAQ() {
  const [tabValue, setTabValue] = useState("tab-0");

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <Row gutter={[32, 32]} justify="space-between">
          <Breadcrumbs breadCrumbParent="Pages" breadCrumbActive="FAQ" />

          <ActionButton />
        </Row>
      </Col>

      <Col span={24}>
        <h1 className="da-mb-0">Hello! How can we help you?</h1>

        <h5 className="da-mb-0 da-text-color-black-80">
          or choose a category to quickly find the help you need.
        </h5>
      </Col>

      <Col xxl={10} lg={15} span={24}>
        <Search
          className="da-xl-search-button"
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
        />
      </Col>

      <MenuFAQ setTabValue={setTabValue} data={data} />

      <CollapseItemFAQ tabValue={tabValue} data={data} />
    </Row>
  );
}
