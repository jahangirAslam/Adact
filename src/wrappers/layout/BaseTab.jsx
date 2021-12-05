import React from "react";
import { Tabs, Skeleton } from "antd";

import { HeaderComponent, BodyComponent } from "@comps/components";

const BaseTab = (props) => {
  let child = <Skeleton active />;
  if (!props.loader) {
    child = (
      <Tabs type="card">
        {props.tabs.map((tab, index) => (
          <Tabs.TabPane tab={tab.title} key={index}>
            {tab.content}
          </Tabs.TabPane>
        ))}
      </Tabs>
    );
  }
  return (
    <>
      <HeaderComponent headers={props.headers}>
      </HeaderComponent>
      <BodyComponent hideLine>
        {child}
      </BodyComponent>
    </>
  );
}

export default BaseTab;
