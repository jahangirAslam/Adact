import React from "react";

import { Row, Col, Collapse } from "antd";
import { RiArrowRightSLine } from "react-icons/ri";

const { Panel } = Collapse;

export default function CollapseItemFAQ(props) {
  const genExtra = () => (
    <RiArrowRightSLine
      size={24}
      className="da-collapse-arrow da-text-color-black-60"
    />
  );

  return (
    <Col span={24} className="da-mb-32">
      {
        props.data.map((item, index) => (
          props.tabValue === ("tab-" + index) && (
              <Row gutter={[32, 32]} key={index}>
                {
                  item.items.map((colItem, index) => (
                    <Col md={12} key={index}>
                      <Collapse accordion>
                        {
                          colItem.item.map((panelItem, index) => (
                            <Panel
                              header={
                                <p className="da-d-flex-center da-p1-body da-mb-0">
                                  {panelItem.icon}
                                  {panelItem.title}
                                  {panelItem.tag}
                                </p>
                              }
                              key={index}
                              showArrow={false}
                              extra={genExtra()}
                            >
                              {panelItem.text}
                            </Panel>
                          ))
                        }
                      </Collapse>
                    </Col>
                  ))
                }
              </Row>
          )
        ))
      }
    </Col>
  );
}
