import React from "react";

import { Col, Tabs } from "antd";

const { TabPane } = Tabs;

export default function MenuFAQ(props) {
  function tabsChange(key) {
    props.setTabValue(key);
  }

  return (
    <Col span={24}>
      <Tabs
        className="da-faq-tabs da-border-radius da-bg-black-0 da-px-42"
        defaultActiveKey="1"
        onChange={tabsChange}
      >
        {
          props.data.map((item, index) => (
            <TabPane
              tab={
                <span className="da-d-flex-center">
                  {item.icon}
                  {item.title}
                </span>
              }
              key={"tab-" + index}
            ></TabPane>
          ))
        }
      </Tabs>
    </Col>
  );
}
