import React from "react";

import { Row, Col, Input, Tag } from "antd";

import ActionButton from "../../../../layout/components/content/action-button/index";
import BreadCrumbs from "../../../../layout/components/content/breadcrumbs/index";
import KnowledgeBaseCards from "./cards";

const { Search } = Input;

export default function KnowledgeBase1() {
  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <Row gutter={[32, 32]} justify="space-between">
          <BreadCrumbs
            breadCrumbParent="Pages"
            breadCrumbActive="Knowledge-Base-1"
          />

          <ActionButton />
        </Row>
      </Col>

      <Col span={24}>
        <h1 className="da-mb-0">Hello! How can we help you?</h1>

        <h5 className="da-mb-0 da-text-color-black-80">
          or choose a category to quickly find the help you need.
        </h5>
      </Col>

      <Col xxl={10} xl={14} span={24}>
        <Search
          className="da-xl-search-button"
          placeholder="Search for anything"
          allowClear
          enterButton="Search"
          size="large"
        />

        <Row align="middle" className="da-mt-24">
          <p className="da-p1-body da-mb-0 da-mb-xs-8 da-mr-8">For Example:</p>

          <Col>
            <Row>
              <Col>
                <Tag>Marketing</Tag>
              </Col>

              <Col>
                <Tag>Accessing Data</Tag>
              </Col>

              <Col>
                <Tag>Service Details</Tag>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        <KnowledgeBaseCards />
      </Col>
    </Row>
  );
}