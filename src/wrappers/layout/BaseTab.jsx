import React from "react";
import { Tabs, Skeleton } from "antd";

import { HeaderComponent, BodyComponent } from "@comps/components";

const BaseTab = (props) => {
  let child = <Skeleton active />;
  if (!props.loader) {
    child = (
      <Tabs type="card" tabPosition={"left"}>
        {props.tabs.map((tab, index) => (
          <Tabs.TabPane
            tab={
              <>
                {tab.icon}
                <span>{window.innerWidth > 880 ? tab.title : ""}</span>
              </>
            }
            key={index}
          >
            {/* <h1>Edit Details</h1> */}
            {tab.content}
          </Tabs.TabPane>
        ))}
      </Tabs>
    );
  }
  return (
    <>
      <HeaderComponent headers={props.headers}></HeaderComponent>
      <BodyComponent hideLine>{child}</BodyComponent>
    </>
  );
};

export default BaseTab;
